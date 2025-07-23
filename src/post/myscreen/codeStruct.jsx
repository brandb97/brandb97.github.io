import code_struct_jpeg from './code_struct.jpeg'
import CodeBox from "../shell/data/CodeBox.jsx";

function codeStruct() {
    return (<div>
        <p className="indent">
            为了更好的介绍代码，这里先介绍一下代码的结构。myscreen的代码可以分为两部分：前端和后端。前端代码定义在<code>myscreen.c</code>中的<code>do_interact_window()</code>，后端代码定义在<code>window.c</code>中的<code>do_window_task()</code>。前端和后端通过UNIX-domain socket通信（UNIX系统允许本地的两个进程通过UNIX domain socket建立TCP连接）。myscreen的结构如下图所示：
        </p>
        <div style={{textAlign: "center"}}>
            <img
                src={code_struct_jpeg}
                alt="code struct jpeg picture"
                style={{width:'80%'}}
            >
            </img>
        </div>
        <p className="indent">
            myscreen中的socket.h和socket.c定义了用于前后端通信的三个函数。<code>socket_path_create</code>随机生成一个字符串作为套接字通信的地址。就像网络通信需要IP地址一样，使用UNIX-domain socket时，你可以随机指定一个不存在的文件路径作为通信地址。在通信时，这个指定的文件路径会被创建成一个套接字类型的文件用来通信。<code>socket_server_xstart</code>接收一个套接字路径作为参数，在这个路径上启动一个TCP服务器，监听该路径上的连接（监听会导致套接字文件被创建），返回套接字文件描述符。<code>socket_server_xaccept</code>用来在一个已经监听的套件字文件描述符上和客户端建立连接（因为建立连接的系统调用叫<code>accept</code>，所以起了这个名字）。
        </p>
        <div className="tips">
            🤔 为什么要叫socket_server_xstart()而不是socket_server_start()？<br/>
            💡 socket_server_xstart()表示发生错误直接exit(EXIT_FAILURE)，socket_server_start()表示发生错误return错误代码，比如return -1。
        </div>
        <p className="indent">
            <code>socket_client_start</code>启动一个客户端用来和参数<code>path</code>指定的地址上的服务器建立连接。这里的代码有点复杂。第17行首先判断<code>path</code>是否存在，如果不存在，可能是后端不存在或者崩溃了，也可能是由于socket_server_xstart和socket_client_start是分别在前/后端进程中并行调用的，在调用socket_client_start时，后端进程还没来得及创建套接字文件，所以我们选择等待一秒钟降低最后一种情况出现的概率。接着我们使用connect系统调用尝试和服务器连接。在connect的终端失败原因中，EINPROGESS表示服务器还在准备监听中，我们需要等待服务器准备好。所以如果出现了EINPROGESS，我们就使用select系统调用等待服务器监听完毕。否则，说明连接失败了，我们打印错误信息，并返回-1。
        </p>
        <CodeBox
            code={
`int socket_client_start(const char *path)
{
\tint sockfd;
\tstruct sockaddr_un addr;
\tfd_set write_set;

\tsockfd = socket(AF_UNIX, SOCK_STREAM, 0);
\tif (sockfd < 0) {
\t\tperror_raw("Error socket() failed");
\t\treturn -1;
\t}

\tmemset(&addr, 0, sizeof(addr));
\taddr.sun_family = AF_UNIX;
\tstrncpy(addr.sun_path, path, sizeof(addr.sun_path) - 1);

\tif (access(path, F_OK) == -1)
\t\tsleep(1);
\twhile (connect(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
\t\tif (errno != EINPROGRESS) {
\t\t\tperror_raw("Error connect() failed");
\t\t\treturn -1;
\t\t}

\t\t/* Wait for the socket to be writable and retry */
\t\tFD_ZERO(&write_set);
\t\tFD_SET(sockfd, &write_set);
\t\tif (select(sockfd + 1, NULL, &write_set, NULL, NULL) < 0) {
\t\t\tperror_raw("Error waiting for connection");
\t\t\treturn -1;
\t\t}
\t}

\treturn sockfd;
}
`
            }
            language="c"
        />
        <p className="indent">
            tty.c和tty.h中定义了设置raw模式和获取当前终端窗口大小的系统调用wrapper函数。raw模式表示用户输入什么，前端就读出什么，前端写入什么，显示器上就打印什么。比如用户输入CTRL-C，前端就读出CTRL-C，而不是收到SIGINT信号（代码中关闭了ISIG）。再比如前端输出\n，显示器就打印\n，而不是打印\n\r（正常情况下终端驱动程序会这么做）。前端需要进入raw模式的原因是前端只是一个中转站，我们应该把处理特殊字符的工作交给伪终端处理，这样当用户输入CTRL-C时，不是前端会终止，而是工作在伪终端上的进程会终止。另一件重要的事是raw模式下会关闭行缓冲，前端可以一个字符一个字符的读出，而不需要等待用户输入\n。由于我希望在输入CTRL-a d时前端可以断开连接，关闭行缓冲很重要。
        </p>
        <p className="indent">
            pty.c和pty.h中定义了后端用来打开伪终端设备，并在伪终端设备上启动进程的代码。<code>pty_info_alloc</code>是一个系统调用的wrapper函数，用来打开一对伪终端主从设备。所谓主从设备，其实基本上等于一个管道的两端。系统调用<code>posix_openpt</code>返回一个伪终端主设备的可供读写的文件描述符，系统调用<code>ptsname</code>返回主设备对应的从设备的设备名（/dev/xxx）。有了从设备的名字，工作早从设备上的应用程序就可以调用熟悉的open，read， write等系统调用了。<code>pty_info_xexec</code>新建一个进程，用来执行用户通过命令行指定的命令（或者默认是"bash"）。不过你也许发现，新建进程的命令只有一行<code>execvp</code>，那么除了<code>fork + exec</code>外，<code>pty_info_xexec</code>还做了什么呢？下面代码的32-43行设置了伪终端的属性和窗口大小，46-62行把工作在伪终端上的应用程序的标准输入，标准输出和标准错误都重定向到伪终端设备。
        </p>
        <CodeBox
        code={
`pid_t pty_xexec(struct pty_info *info, struct termios *termios,
\t\tstruct winsize *ws, char **argv)
{
\tpid_t pid;
\tint slave_fd;

\tpid = fork();
\tif (pid == -1) {
\t\tperror("Error forking process");
\t\texit(EXIT_FAILURE);
\t}

\tif (pid > 0)
\t\treturn pid; /* Parent process returns child's PID */

\t/* Child process */
\tif (setsid() == -1) {
\t\tperror("Error creating new session");
\t\texit(EXIT_FAILURE);
\t}

\tslave_fd = open(info->slave_name, O_RDWR);
\tif (slave_fd == -1) {
\t\tfprintf(stderr, "Error opening slave PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}

\tassert(termios != NULL);
\tassert(ws != NULL);
\t/* Set terminal attributes */
\tif (tcsetattr(slave_fd, TCSANOW, termios) == -1) {
\t\tfprintf(stderr,
\t\t\t"Error setting terminal attributes for PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}
\t/* Set window size */
\tif (ioctl(slave_fd, TIOCSWINSZ, ws) == -1) {
\t\tfprintf(stderr, "Error setting window size for PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}

\t/* Redirect standard input/output/error to the PTY */
\tif (dup2(slave_fd, STDIN_FILENO) != STDIN_FILENO) {
\t\tfprintf(stderr, "Error redirecting stdin to PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}
\tif (dup2(slave_fd, STDOUT_FILENO) !=
\t    STDOUT_FILENO) {
\t\tfprintf(stderr, "Error redirecting stdout to PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}
\tif (dup2(slave_fd, STDERR_FILENO) !=
\t    STDERR_FILENO) {
\t\tfprintf(stderr, "Error redirecting stderr to PTY '%s': %s\\n",
\t\t\tinfo->slave_name, strerror(errno));
\t\texit(EXIT_FAILURE);
\t}

\t/* Close the master PTY */
\tclose(info->master_fd);

\t/* Execute the command */
\tif (!argv || !*argv) {
\t\texeclp("bash", NULL);
\t\tperror("Error executing bash");
\t\texit(EXIT_FAILURE);
\t}

\texecvp(*argv, argv);

\tfprintf(stderr, "Error executing command '%s", *argv++);
\twhile (*argv) {
\t\tfprintf(stderr, " %s", *argv);
\t\targv++;
\t}
\tfprintf(stderr, "': %s\\n", strerror(errno));
\texit(EXIT_FAILURE);
}
`
        }
        language="c"
        />
        <p className="indent">
            window.c和window.h中，用<code>struct window</code>抽象一个监听在<code>w.socket</code>上，进程号为<code>w.pid</code>的后端。我在代码中也把后端称作一个window task，或者一个daemon（意思是守护进程，一般守护进程永不结束，一直在后台工作。后端则一直在后台监听socket准备连接，类似守护进程）。<code>struct window_vec</code>用来保存许多个后端，这样前端可以选择一个后端进行连接。<code>window_xstart</code>由前端调用，用来启动一个后端进程。在代码18-30行，<code>window_xstart</code>把后端进程的信息用指向<code>struct window</code>的指针返回给前端进程。而fork出的子进程则调用<code>do_window_task</code>正式成为后端进程。<code>window_vec_store</code>将所有后端进程的信息保存到<code>$HOME/.myscreen</code>。<code>window_vec_load</code>则将所有后端进程的信息加载到<code>struct window_vec</code>中。
        </p>
        <CodeBox
            code={
`struct window *window_xstart(char *name, struct termios *termios,
\t\t\t     struct winsize *ws, char **argv)
{
\tstruct window *win;
\tstruct pty_info *pty_info = NULL;
\tchar *socket_path = NULL;
\tpid_t pid;

\t/* Create socket for communication */
\tsocket_path = socket_path_xcreate();
\t/* Open pty device */
\tpty_info = pty_info_xalloc();

\tpid = fork();
\tif ((pid) < 0)
\t\tferror_raw_die("Error forking process for window task");
\telse if (pid > 0) {
\t\twin = (struct window *)calloc(1, sizeof(struct window));
\t\tif (win == NULL)
\t\t\tferror_raw_die(
\t\t\t\t"Error allocating memory for window struct");
\t\twin->name = strdup(name);
\t\twin->device = strdup(pty_info->slave_name);
\t\twin->socket = socket_path;
\t\twin->pid = pid;
\t\tif (win->name == NULL || win->device == NULL ||
\t\t    win->socket == NULL)
\t\t\tferror_raw_die("Error allocating memory for window");
\t\tpty_info_free(pty_info);
\t\treturn win;
\t}

\t/* Window task start here */
\tdo_window_task(pty_info, socket_path, termios, ws, argv);
\t/*
\t * Since do_window_task() never returns, no need to free
\t * socket_path and pty_info here
\t */
\treturn NULL;
}
`
        }
            language="c"
        />
    </div>)
}

export default codeStruct;
