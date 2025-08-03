import{j as e,c as l,r as d,H as _,F as h}from"./Footer-BCDbRi8S.js";import{C as t,B as w}from"./CodeBox-DHD9yWMe.js";const f="/assets/ibm1969-DPtM4P6B.jpg";function x(){return e.jsxs("div",{children:[e.jsxs("p",{className:"indent",children:["终端是什么？如果你熟悉UNIX系统，你也许会说终端就是",e.jsx("code",{children:'"/dev/tty"'}),"这个设备。不过从UNIX程序的视角来看（试试cat /dev/tty），/dev/tty和普通的文件没有什么区别。在UNIX系统里，一个程序用",e.jsx("code",{children:"open"}),"系统调用既可以打开一个文件，也可以打开一个终端设备。",e.jsx("code",{children:"open"}),"系统调用返回一个整数类型的文件描述符（其实就是一个数组下标），",e.jsx("code",{children:"read/write"}),"系统调用对这个打开的文件描述符进行读写操作。许多时候，对于一个程序来说，一个文件描述符究竟对应于一个磁盘文件还是属于一个终端设备并不重要，只要可以对这个文件描述符进行读写操作就可以。但是操作系统就需要区分文件描述符对应的设备是什么了。如果是读写硬盘，操作系统需要移动硬盘的磁头读写磁道上的数据；如果是读写终端，操作系统的终端驱动程序则需要等待键盘的输入，或者是把ascii码打印在屏幕上。"]}),e.jsxs("p",{className:"indent",children:["所以终端这个名词其实可以对应两种东西：终端设备和终端驱动程序。在很早以前，终端设备，就是指键盘和屏幕，UNIX系统中用",e.jsx("code",{children:'"/dev/tty"'}),"表示；终端驱动则负责实现在终端设备上的系统调用（e.g. UNIX系统上的open，read，write）。下面是一张古早（1969年，来源于维基百科）人们在终端上工作的相片（也许现在有一些性格变态的书呆子也会这么工作，林子大了什么鸟都有！）"]}),e.jsx("div",{className:"ibm1969-pic",children:e.jsx("img",{src:f,alt:"ibm terminal in 1969"})}),e.jsxs("div",{className:"tips",children:["🤔 为什么终端被称为tty？",e.jsx("br",{}),"💡 tty的全称是TeleTYpewriter，如果你想了解更多，请看",e.jsx("a",{href:"https://zh.wikipedia.org/zh-cn/電傳打字機",children:"电传打印机"})]})]})}function p(){return e.jsxs("div",{children:[e.jsx("p",{className:"indent",children:"还记得我说过“大部分程序不关心文件描述符是什么设备”吗？但的确存在一些程序就是针对终端编写的，比如vim。想想vim要如何实现页面滚动的功能呢？首先，vim需要告诉终端驱动程序关闭行缓冲功能。在默认情况下，终端驱动程序会在用户按下ENTER时才把输入发送给应用程序，但对于vim，如果我们每次要到按“下箭头+ENTER”才能向下滚动显然很不方便。其次，在读取到用户输入的下箭头之后，vim需要结合光标的位置和终端显示器的宽度判断是否需要滚动页面。在UNIX系统中，用来获取和设置终端的系统调用如下所示："}),e.jsx(t,{code:`/* 获取终端属性，e.g.是否行缓冲 */
int tcgetattr(int fildes, struct termios *termios_p);

/* 设置终端属性 */
int tcsetattr(int fildes, int optional_actions, const struct termios *termios_p);

struct winsize {
    unsigned short ws_row;
    unsigned short ws_col;
    unsigned short ws_xpixel;
    unsigned short ws_ypixel;
} ws;

/* 获取/设置终端窗口大小 */
if (ioctl(STDIN_FILENO, TIOCGWINSZ, &ws) == -1)
    fprintf(stderr, "读取终端窗口大小错误\\n");`,language:"c"}),e.jsxs("p",{className:"indent",children:["抛开vim不谈，你是否想过当按你下CTRL-C时为什么可以让程序终止呢？当用户输入了CTRL-C，终端驱动并不会将CTRL-C放到输入缓冲区供程序读取，取而代之的事情是，终端驱动会向程序发送SIGINT，从而导致程序终止。那么，如何让终端驱动不要这么做呢？你可以使用系统调用",e.jsx("code",{children:"tcsetattr"}),"，或者更简单的，你可以使用",e.jsx("code",{children:"stty"}),"命令："]}),e.jsx(t,{code:`stty -isig   # 不允许特殊字符发送信号
stty isig    # 恢复特殊字符发送信号
stty intr ^L # 设置中断信号对于的字符是CTRL-L`,language:"bash"}),e.jsxs("p",{className:"indent",children:["说了这么多，大家应该明白：除了读写操作，终端文件描述符和普通文件描述符的区别很大。比如我们可以用上面提到的系统调用从终端文件描述符中获取许多普通文件描述符中没有的信息。但是普通文件符能做的",e.jsx("code",{children:"lseek"}),"（将磁盘读写头移到文件的某个指定位置），则对于终端设备没有意义。"]})]})}const m="/assets/window_prog-Disl9x2E.jpeg",j="/assets/window_shell-DmLOIUQH.jpeg",u="/assets/screen_like-uICQQPGK.jpeg";function g(){return e.jsxs("div",{children:[e.jsx("p",{className:"indent",children:"古早时期，窗口=显示器。但现在，我们会在显示器中打开一大堆窗口，每个窗口中运行一个应用程序。一个应用程序的结构可以用下面这幅图片描述"}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx("img",{src:m,alt:"windows program frame",style:{width:"70%"}})}),e.jsx("p",{className:"indent",children:"为了让shell程序也可以运行到窗口上，人们开发了许多专门运行shell命令的窗口程序（比如iTerm，warp等等）。这些程序的结构如下所示"}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx("img",{src:j,alt:"windows shell frame",style:{width:"77%"}})}),e.jsx("p",{className:"indent",children:"看起来非常简单，对不对？不过你也许会问：什么是伪终端（英文简称是pty）？很显然，伪终端不是真实的设备，如果你熟悉UNIX系统，伪终端看起来更像是管道。但是，伪终端除了具有管道的功能，还可以像正常的终端一样获取窗口大小，设置各种各样的属性。在上面的图片中，当shell窗口应用被打开时，shell窗口应用就会打开一个伪终端，设置伪终端的窗口大小为shell窗口应用的窗口大小，然后在伪终端的一边运行bash程序，一边读取bash程序的输出/发送用户的输入。如果用户输入了CTRL-C到伪终端设备，伪终端设备也不会像管道一样发送CTRL-C到另一端，而是会想终端一样对另一端的程序发送SIGINT信号。"}),e.jsx("p",{className:"indent",children:"Whew！说了这么多，终于可以谈谈screen这样的窗口管理程序该怎么实现了，一个简单的想法是这样"}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx("img",{src:u,alt:"screen frame",style:{width:"77%"}})}),e.jsxs("p",{className:"indent",children:["这张图片中，screen程序作为前端，读取用户输入只需要在标准输入",e.jsx("code",{children:"STDIN_FILENO"}),"上调用",e.jsx("code",{children:"read"}),"，渲染窗口只需要把程序输出",e.jsx("code",{children:"printf"}),"到标准输出（之后shell窗口程序——比如MacOS上的iTerm程序，会把标准输出的字符绘制到窗口中）。screen可以根据用户需求（e.g. ",e.jsx("code",{children:"screen -a -t 0"}),"）接入（attach）到一个伪终端，也可以离开（detach）当前伪终端，接入其他伪终端，这样就实现了窗口管理和切换。当然，实现screen要考虑的事情比上面说的其实还要多很多，但这篇博客中的实现会保持尽可能简单。myscreen虽然输出没有screen漂亮，不过管理和切换窗口的思想和screen是一致的。"]})]})}function I(){return e.jsxs("div",{children:[e.jsxs("p",{className:"indent",children:["终于，我们可以看看该怎么写代码了。你可以在",e.jsx("a",{href:"https://github.com/brandb97/myscreen",children:"这里"}),"下载一份myscreen的代码。然后运行",e.jsx("code",{children:"make"}),"得到一份可执行文件",e.jsx("code",{children:"myscreen"}),"。"]}),e.jsx(t,{code:`git clone https://github.com/brandb97/myscreen
cd myscreen
make
./myscreen`,language:"bash"}),e.jsx("p",{children:"这时你应该已经进入了一个bash界面了，按下CTRL-A d就可以和bash分离。如果你想继续刚才的工作，运行下面的命令"}),e.jsx(t,{code:`./myscreen -l # 列出所有窗口信息
./myscreen -a 0 # attach到第0个窗口
# 或者试试./myscreen -a myscreen.0，表示attach到名字是myscreen.0的窗口`,language:"bash"}),e.jsx("p",{children:"如果你想在窗口中运行指定的程序，比如vim，试试下面的命令，不出意外的话，myscreen会在新窗口中打开vim编辑器。🎉Hooray!"}),e.jsx(t,{code:`# ./myscreen cmd args...，新建一个窗口并在这个窗口中运行cmd args...
./myscreen vim`,language:"bash"})]})}const N="/assets/code_struct-Nb4mniTo.jpeg";function k(){return e.jsxs("div",{children:[e.jsxs("p",{className:"indent",children:["为了更好的介绍代码，这里先介绍一下代码的结构。myscreen的代码可以分为两部分：前端和后端。前端代码定义在",e.jsx("code",{children:"myscreen.c"}),"中的",e.jsx("code",{children:"do_interact_window()"}),"，后端代码定义在",e.jsx("code",{children:"window.c"}),"中的",e.jsx("code",{children:"do_window_task()"}),"。前端和后端通过UNIX-domain socket通信（UNIX系统允许本地的两个进程通过UNIX domain socket建立TCP连接）。myscreen的结构如下图所示："]}),e.jsx("div",{style:{textAlign:"center"},children:e.jsx("img",{src:N,alt:"code struct jpeg picture",style:{width:"80%"}})}),e.jsxs("p",{className:"indent",children:["myscreen中的socket.h和socket.c定义了用于前后端通信的三个函数。",e.jsx("code",{children:"socket_path_create"}),"随机生成一个字符串作为套接字通信的地址。就像网络通信需要IP地址一样，使用UNIX-domain socket时，你可以随机指定一个不存在的文件路径作为通信地址。在通信时，这个指定的文件路径会被创建成一个套接字类型的文件用来通信。",e.jsx("code",{children:"socket_server_xstart"}),"接收一个套接字路径作为参数，在这个路径上启动一个TCP服务器，监听该路径上的连接（监听会导致套接字文件被创建），返回套接字文件描述符。",e.jsx("code",{children:"socket_server_xaccept"}),"用来在一个已经监听的套件字文件描述符上和客户端建立连接（因为建立连接的系统调用叫",e.jsx("code",{children:"accept"}),"，所以起了这个名字）。"]}),e.jsxs("div",{className:"tips",children:["🤔 为什么要叫socket_server_xstart()而不是socket_server_start()？",e.jsx("br",{}),"💡 socket_server_xstart()表示发生错误直接exit(EXIT_FAILURE)，socket_server_start()表示发生错误return错误代码，比如return -1。"]}),e.jsxs("p",{className:"indent",children:[e.jsx("code",{children:"socket_client_start"}),"启动一个客户端用来和参数",e.jsx("code",{children:"path"}),"指定的地址上的服务器建立连接。这里的代码有点复杂。第17行首先判断",e.jsx("code",{children:"path"}),"是否存在，如果不存在，可能是后端不存在或者崩溃了，也可能是由于socket_server_xstart和socket_client_start是分别在前/后端进程中并行调用的，在调用socket_client_start时，后端进程还没来得及创建套接字文件，所以我们选择等待一秒钟降低最后一种情况出现的概率。接着我们使用connect系统调用尝试和服务器连接。在connect的终端失败原因中，EINPROGESS表示服务器还在准备监听中，我们需要等待服务器准备好。所以如果出现了EINPROGESS，我们就使用select系统调用等待服务器监听完毕。否则，说明连接失败了，我们打印错误信息，并返回-1。"]}),e.jsx(t,{code:`int socket_client_start(const char *path)
{
	int sockfd;
	struct sockaddr_un addr;
	fd_set write_set;

	sockfd = socket(AF_UNIX, SOCK_STREAM, 0);
	if (sockfd < 0) {
		perror_raw("Error socket() failed");
		return -1;
	}

	memset(&addr, 0, sizeof(addr));
	addr.sun_family = AF_UNIX;
	strncpy(addr.sun_path, path, sizeof(addr.sun_path) - 1);

	if (access(path, F_OK) == -1)
		sleep(1);
	while (connect(sockfd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
		if (errno != EINPROGRESS) {
			perror_raw("Error connect() failed");
			return -1;
		}

		/* Wait for the socket to be writable and retry */
		FD_ZERO(&write_set);
		FD_SET(sockfd, &write_set);
		if (select(sockfd + 1, NULL, &write_set, NULL, NULL) < 0) {
			perror_raw("Error waiting for connection");
			return -1;
		}
	}

	return sockfd;
}
`,language:"c"}),e.jsx("p",{className:"indent",children:"tty.c和tty.h中定义了设置raw模式和获取当前终端窗口大小的系统调用wrapper函数。raw模式表示用户输入什么，前端就读出什么，前端写入什么，显示器上就打印什么。比如用户输入CTRL-C，前端就读出CTRL-C，而不是收到SIGINT信号（代码中关闭了ISIG）。再比如前端输出\\n，显示器就打印\\n，而不是打印\\n\\r（正常情况下终端驱动程序会这么做）。前端需要进入raw模式的原因是前端只是一个中转站，我们应该把处理特殊字符的工作交给伪终端处理，这样当用户输入CTRL-C时，不是前端会终止，而是工作在伪终端上的进程会终止。另一件重要的事是raw模式下会关闭行缓冲，前端可以一个字符一个字符的读出，而不需要等待用户输入\\n。由于我希望在输入CTRL-a d时前端可以断开连接，关闭行缓冲很重要。"}),e.jsxs("p",{className:"indent",children:["pty.c和pty.h中定义了后端用来打开伪终端设备，并在伪终端设备上启动进程的代码。",e.jsx("code",{children:"pty_info_alloc"}),"是一个系统调用的wrapper函数，用来打开一对伪终端主从设备。所谓主从设备，其实基本上等于一个管道的两端。系统调用",e.jsx("code",{children:"posix_openpt"}),"返回一个伪终端主设备的可供读写的文件描述符，系统调用",e.jsx("code",{children:"ptsname"}),"返回主设备对应的从设备的设备名（/dev/xxx）。有了从设备的名字，工作早从设备上的应用程序就可以调用熟悉的open，read， write等系统调用了。",e.jsx("code",{children:"pty_info_xexec"}),'新建一个进程，用来执行用户通过命令行指定的命令（或者默认是"bash"）。不过你也许发现，新建进程的命令只有一行',e.jsx("code",{children:"execvp"}),"，那么除了",e.jsx("code",{children:"fork + exec"}),"外，",e.jsx("code",{children:"pty_info_xexec"}),"还做了什么呢？下面代码的32-43行设置了伪终端的属性和窗口大小，46-62行把工作在伪终端上的应用程序的标准输入，标准输出和标准错误都重定向到伪终端设备。"]}),e.jsx(t,{code:`pid_t pty_xexec(struct pty_info *info, struct termios *termios,
		struct winsize *ws, char **argv)
{
	pid_t pid;
	int slave_fd;

	pid = fork();
	if (pid == -1) {
		perror("Error forking process");
		exit(EXIT_FAILURE);
	}

	if (pid > 0)
		return pid; /* Parent process returns child's PID */

	/* Child process */
	if (setsid() == -1) {
		perror("Error creating new session");
		exit(EXIT_FAILURE);
	}

	slave_fd = open(info->slave_name, O_RDWR);
	if (slave_fd == -1) {
		fprintf(stderr, "Error opening slave PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}

	assert(termios != NULL);
	assert(ws != NULL);
	/* Set terminal attributes */
	if (tcsetattr(slave_fd, TCSANOW, termios) == -1) {
		fprintf(stderr,
			"Error setting terminal attributes for PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}
	/* Set window size */
	if (ioctl(slave_fd, TIOCSWINSZ, ws) == -1) {
		fprintf(stderr, "Error setting window size for PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}

	/* Redirect standard input/output/error to the PTY */
	if (dup2(slave_fd, STDIN_FILENO) != STDIN_FILENO) {
		fprintf(stderr, "Error redirecting stdin to PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}
	if (dup2(slave_fd, STDOUT_FILENO) !=
	    STDOUT_FILENO) {
		fprintf(stderr, "Error redirecting stdout to PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}
	if (dup2(slave_fd, STDERR_FILENO) !=
	    STDERR_FILENO) {
		fprintf(stderr, "Error redirecting stderr to PTY '%s': %s\\n",
			info->slave_name, strerror(errno));
		exit(EXIT_FAILURE);
	}

	/* Close the master PTY */
	close(info->master_fd);

	/* Execute the command */
	if (!argv || !*argv) {
		execlp("bash", NULL);
		perror("Error executing bash");
		exit(EXIT_FAILURE);
	}

	execvp(*argv, argv);

	fprintf(stderr, "Error executing command '%s", *argv++);
	while (*argv) {
		fprintf(stderr, " %s", *argv);
		argv++;
	}
	fprintf(stderr, "': %s\\n", strerror(errno));
	exit(EXIT_FAILURE);
}
`,language:"c"}),e.jsxs("p",{className:"indent",children:["window.c和window.h中，用",e.jsx("code",{children:"struct window"}),"抽象一个监听在",e.jsx("code",{children:"w.socket"}),"上，进程号为",e.jsx("code",{children:"w.pid"}),"的后端。我在代码中也把后端称作一个window task，或者一个daemon（意思是守护进程，一般守护进程永不结束，一直在后台工作。后端则一直在后台监听socket准备连接，类似守护进程）。",e.jsx("code",{children:"struct window_vec"}),"用来保存许多个后端，这样前端可以选择一个后端进行连接。",e.jsx("code",{children:"window_xstart"}),"由前端调用，用来启动一个后端进程。在代码18-30行，",e.jsx("code",{children:"window_xstart"}),"把后端进程的信息用指向",e.jsx("code",{children:"struct window"}),"的指针返回给前端进程。而fork出的子进程则调用",e.jsx("code",{children:"do_window_task"}),"正式成为后端进程。",e.jsx("code",{children:"window_vec_store"}),"将所有后端进程的信息保存到",e.jsx("code",{children:"$HOME/.myscreen"}),"。",e.jsx("code",{children:"window_vec_load"}),"则将所有后端进程的信息加载到",e.jsx("code",{children:"struct window_vec"}),"中。"]}),e.jsx(t,{code:`struct window *window_xstart(char *name, struct termios *termios,
			     struct winsize *ws, char **argv)
{
	struct window *win;
	struct pty_info *pty_info = NULL;
	char *socket_path = NULL;
	pid_t pid;

	/* Create socket for communication */
	socket_path = socket_path_xcreate();
	/* Open pty device */
	pty_info = pty_info_xalloc();

	pid = fork();
	if ((pid) < 0)
		ferror_raw_die("Error forking process for window task");
	else if (pid > 0) {
		win = (struct window *)calloc(1, sizeof(struct window));
		if (win == NULL)
			ferror_raw_die(
				"Error allocating memory for window struct");
		win->name = strdup(name);
		win->device = strdup(pty_info->slave_name);
		win->socket = socket_path;
		win->pid = pid;
		if (win->name == NULL || win->device == NULL ||
		    win->socket == NULL)
			ferror_raw_die("Error allocating memory for window");
		pty_info_free(pty_info);
		return win;
	}

	/* Window task start here */
	do_window_task(pty_info, socket_path, termios, ws, argv);
	/*
	 * Since do_window_task() never returns, no need to free
	 * socket_path and pty_info here
	 */
	return NULL;
}
`,language:"c"})]})}function y(){return e.jsxs("div",{children:[e.jsxs("p",{className:"indent",children:["前端程序主要写在myscreen.c中，其中包括",e.jsx("code",{children:"main()"}),"函数：负责初始化和CLI（解析命令行参数），以及",e.jsx("code",{children:"do_interact_window()"}),"：用来和后端套接字交互。",e.jsx("code",{children:"main()"}),"函数在解析完毕命令行参数后，首先初始化了一些signal handler，这些signal handle的作用是恢复终端的属性。这么做的目的是，前端为了只充当中转的作用，进入了raw模式，如果前端进程在运行中因为信号或者是某些调用发生了错误退出，应该在退出前恢复成正常的终端模式。否则，你会发现由于raw模式下不会把'\\n'转换成'\\n\\r'，正常程序的输出在raw模式下会非常乱。假设用户没有输入--attach或者--list，那么",e.jsx("code",{children:"main()"}),"在第15行把当前终端设置为raw模式，并把正常的终端属性保存到orign_termios。在第20行启动一个后台进程运行用户通过",e.jsx("code",{children:"argv"}),"指定的命令，在第22行进入",e.jsx("code",{children:"do_interact_window()"}),"和后端通过socket交互。"]}),e.jsx(t,{code:`int main(int argc, char **argv)
{
	/* parse options */
	signal(SIGWINCH, sigwinch_handler);
	signal(SIGABRT, reset_tty_sig);
	signal(SIGKILL, reset_tty_sig);
	signal(SIGINT, reset_tty_sig);
	signal(SIGTERM, reset_tty_sig);
	atexit(reset_tty);
	windows = window_vec_xalloc();
	window_vec_load(windows, screen_store);
	if (mode == START) {
		char window_name[32] = { 0 };

		tty_set_raw(STDIN_FILENO, &origin_termios);
		raw_mode = 1;
		tty_get_winsize(STDIN_FILENO, &ws);
		snprintf(window_name, 32, "myscreen.%u",
			 (unsigned int)windows->nr);
		win = window_xstart(window_name, &origin_termios, &ws, argv);

		task_ret = do_interact_window(win);
		if (task_ret == 0)
			window_vec_add(windows, win);
		else
			/* Failed or killed */
			window_free(win);
	} /* ignore attach and list for simplicity */
	window_vec_save(windows, screen_store);
	window_vec_free(windows);

	reset_tty();
}`,language:"c"}),e.jsxs("p",{className:"indent",children:[e.jsx("code",{children:"do_interact_window()"}),"做的事情非常简单，首先通过",e.jsx("code",{children:"socket_client_xstart()"}),"和后端进程建立TCP连接，接着，把socket中的输出写到stdout（STDOUT_FILENO）中，把stdin（STDIN_FILENO）中的输入写到socket中。不过除了写入正常的用户输出，",e.jsx("code",{children:"do_interact_window()"}),"中需要做三件事：1. 当窗口大小改变时（接收到SIGWINCH时），告诉后端进程新的窗口大小，如代码17-29行所示；2. 在接收到CTRL-a d时，返回0，表示后端进程仍然可以继续通信；3. 在接收到CTRL-a k时，杀死后端进程，返回-1，表示后端进程已经终止，可以释放资源。"]}),e.jsx(t,{code:`static int do_interact_window(struct window *win)
{
	int sock_fd, nfds;
	char sock_buf[256];
	fd_set read_set;
	int ret;

	sock_fd = socket_client_start(win->socket);
	if (sock_fd < 0) {
		ferror_raw("Error connecting to socket %s", win->socket);
		return -1;
	}
	nfds = sock_fd > STDIN_FILENO ? sock_fd + 1 : STDIN_FILENO + 1;
	for (;;) {
		char c;

		if (window_ch) {
			struct winsize ws;
			char winch_buf[5] = { [0] = 'w' };
			uint16_t *p = (uint16_t *)(winch_buf + 1);

			tty_get_winsize(STDIN_FILENO, &ws);
			window_ch = 0;
			p[0] = ws.ws_row;
			p[1] = ws.ws_col;
			if (write(sock_fd, winch_buf, 5) != 5)
				FAIL(perror_raw(
					"Error sending window change to socket"));
		}

		FD_ZERO(&read_set);
		FD_SET(STDIN_FILENO, &read_set);
		FD_SET(sock_fd, &read_set);
		if (select(nfds, &read_set, NULL, NULL, NULL) < 0) {
			if (errno == EINTR)
				continue; /* Interrupted by signal, retry select
					   */
			FAIL(perror_raw(
				"Error in select from STDIN and socket"));
		}

		if (FD_ISSET(sock_fd, &read_set)) {
			/* read sock_fd and write to STDOUT_FILENO */
		} else if (FD_ISSET(STDIN_FILENO, &read_set)) {
			if (c != CTRL_A) {
				/* read STDIN_FILENO and write to sock_fd */
			}

			/*
			 * c is CTRL-A, if the next char is 'd' or 'k', we
			 * detach or kill the window. Otherwise we ignore the
			 * next character.
			 */
			if (read(STDIN_FILENO, &c, 1) != 1)
				FAIL(perror_raw(
					"Error reading char from STDIN after CTRL-A"));
			switch (c) {
			case DETACH:
				ret = 0;
				ferror_raw("Detach from window %s: pid %d",
					win->name, win->pid);
				goto cleanup;
			case KILL:
				kill(win->pid, SIGKILL);
				ret = -1;
				ferror_raw("Kill window %s: pid %d",
					win->name, win->pid);
				goto cleanup;
			default:
				/* ignore unknown char */
				break;
			}
		}
	}

cleanup:
	close(sock_fd);
	return ret;
}
`,language:"c"})]})}function E(){return e.jsxs("div",{children:[e.jsxs("p",{className:"indent",children:["你是否还记得博客开头的对话，如果用户登出，如何让进程继续运行？对于后端，我们面临着同样的问题，我们希望后端程序一直监听套接字，等待前台进程的连接，并且不要因为用户退出就终止。如果你熟悉UNIX系统，你也许已经猜到要用",e.jsx("code",{children:"setsid"}),"系统调用。",e.jsx("code",{children:"setsid"}),"表示开启一个新会话。一个会话（session）通常和一个终端相关联，当用户退出终端时，终端驱动会向所有属于该会话的进程发送SIGHUP。开启一个新会话就意味着不会收到SIGHUP，于是后端进程就可以永远运行了。后端进程的代码主要写在window.c中的",e.jsx("code",{children:"do_interact_window()"}),"中。",e.jsx("code",{children:"do_interact_window()"}),"首先开启一个新会话成为守护进程，接着在伪终端上fork+exec一个用户指定的（或默认bash）shell命令，随后启动套接字服务器，允许前端进行连接。在第27行和前端连接成功后，",e.jsx("code",{children:"do_interact_window()"}),"可能做三件事：1. 从套接字读出一个用户输入的字符发送给伪终端；2. 从伪终端读出程序输出，通过套接字发送给前端；3. 从套接字读出新的窗口大小，设置伪终端窗口大小，这会导致所有运行在伪终端上的程序（比如vim）都收到SIGWINCH信号。"]}),e.jsx(t,{code:`static void do_window_task(struct pty_info *pty_info, char *socket_path,
			   struct termios *termios, struct winsize *ws,
			   char **argv)
{
	int master_fd, socket_fd;

	if (setsid() <= 0)
		perror_raw_die("Error creating new session in window task");

	master_fd = pty_info->master_fd;
	/* Start a socket daemon listen on socket_path */
	socket_fd = socket_server_xstart(socket_path);
	/* Start a child process runs on pty */
	pty_xexec(pty_info, termios, ws, argv);

	/*
	 * This for loop never breaks, this daemon only exit when receive
	 * a SIGKILL signal.
	 */
	for (;;) {
		int cfd, nfds;
		char socket_buf[4];
		char pty_buf[257];
		fd_set read_fds;

		/* Start a connection */
		cfd = socket_server_xaccept(socket_fd);
		nfds = cfd > master_fd ? cfd + 1 : master_fd + 1;

		for (;;) {
			int n;

			FD_ZERO(&read_fds);
			FD_SET(cfd, &read_fds);
			FD_SET(master_fd, &read_fds);
			if (select(nfds, &read_fds, NULL, NULL, NULL) < 0) {
				if (errno == EINTR)
					continue; /* Interrupted by signal,
						     retry select */
				perror_raw(
					"Error in select on socket and pty master");
			}

			if (FD_ISSET(cfd, &read_fds)) {
				/* Read from socket */
				n = read(cfd, socket_buf, 1);
				if (n < 0)
					perror_raw_die(
						"Error reading from socket");
				else if (n == 0) {
					/*
					 * This means \`myscreen\` detach from
					 * this window, so break and wait for
					 * the next connection
					 */
					close(cfd);
					break;
				}

				switch (socket_buf[0]) {
				case CHAR_MODE:
					if (read(cfd, socket_buf, 1) != 1)
						perror_raw_die(
							"Error reading char from socket");
					if (write(master_fd, socket_buf, 1) !=
					    1)
						perror_raw_die(
							"Error writing char to pty master");
					break;
				case WINCH_MODE:
					if (read(cfd, socket_buf, 4) != 4)
						perror_raw_die(
							"Error reading window size from socket");
					pty_xset_winsize(master_fd, socket_buf);
					break;
				default:
					ferror_raw_die(
						"Unknown command from socket: %c",
						socket_buf[0]);
				}
			}

			if (FD_ISSET(master_fd, &read_fds)) {
				/* Read from pty master */
				n = read(master_fd, pty_buf,
					 sizeof(pty_buf) - 1);
				if (n < 0)
					perror_raw_die(
						"Error reading from pty master");
				else if (n == 0) {
					ferror_raw("PTY closed");
					exit(EXIT_SUCCESS);
				}
				if (write(cfd, pty_buf, n) != n)
					perror_raw_die(
						"Error writing to socket from pty master");
			}
		}
	}
}`,language:"c"})]})}const a=[{id:"introTerm",label:"终端",level:2},{id:"controlTerm",label:"终端驱动",level:3},{id:"introWin",label:"窗口管理",level:2},{id:"introCode",label:"myscreen",level:2},{id:"codeStruct",label:"myscreen组成",level:3},{id:"codeFrontEnd",label:"myscreen前端",level:3},{id:"codeDaemon",label:"myscreen守护进程（后端）",level:3},{id:"theEnd",label:"结束语",level:2}];function v({sectionRefs:i}){const[o,s]=d.useState("");return d.useEffect(()=>{const r=new IntersectionObserver(n=>{n.forEach(c=>{c.isIntersecting&&s(c.target.id)})},{rootMargin:"-40% 0px -60% 0px",threshold:0});return Object.values(i.current).forEach(n=>{n&&r.observe(n)}),()=>r.disconnect()},[]),console.log("hello"+o),e.jsx("aside",{children:e.jsx("ul",{className:"myscreen-toc",children:a.map(r=>e.jsx("li",{children:e.jsx("a",{className:`${o===r.id?"active":"normal"}-${r.level}`,href:`#${r.id}`,onClick:n=>{var c;n.preventDefault(),(c=i.current[r.id])==null||c.scrollIntoView({behavior:"smooth"})},children:r.label})},r.id))})})}function T({sectionRefs:i}){const o=new Map([["introTerm",{content:x()}],["controlTerm",{content:p()}],["introWin",{content:g()}],["introCode",{content:I()}],["codeStruct",{content:k()}],["codeFrontEnd",{content:y()}],["codeDaemon",{content:E()}],["theEnd",{content:e.jsx("div",{children:e.jsx("p",{className:"indent",children:"wu~，大功告成。如果你想完善这篇博客，feel free to send me issue on github。Happy coding😄"})})}]]);return e.jsxs("div",{className:"myscreen-body",children:[e.jsx("h1",{children:"MyScreen: 编写一个简单的screen程序"}),e.jsxs("div",{className:"notice",children:["👉 ",e.jsx("code",{children:"myscreen"}),"的代码在",e.jsx("a",{href:"https://github.com/brandb97/myscreen.git",children:"这个仓库"})]}),e.jsxs("p",{className:"content",children:[e.jsx("span",{className:"QA",children:"Q"}),"：如果你正在命令行窗口中工作，比如你打开了一个bash窗口。这时你准备做机器学习的课程实验，而实验结果需要几个小时才能跑完。你希望可以一边运行实验，一边在bash中处理手头的其他工作，你会怎么做？",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"A"}),"：我会用bg命令让实验脚本在后台运行，或者我干脆新开一个bash窗口运行实验脚本。",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"Q"}),"：可是实验必须在远程服务器上完成，如果你的机器学习老师疯了，给你们安排的实验需要运行12个小时，但是你没法12个小时都在远程服务器上保持登陆状态，你该怎么办？",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"A"}),"：我敢肯定南京大学的老师不会这么做的......",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"Q"}),"：You never know！",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"A"}),"：好吧，假设现实真的如此，我碰巧知道当退出bash时，bash会向所有后台程序发送SIGHUP信号。让实验脚本忽略SIGHUP很简单，使用nohup......",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"Q"}),"：你的老师不准你安装nohup",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"A"}),"：你是不是想让我说screen",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"Q"}),"：exactly！screen可以新建一个窗口，并在这个窗口中运行任何程序。按下CTRL-A d就可以让这个窗口在后台运行，即使退出登陆也没有关系。接下来，让我给你讲讲怎么样写一个具有和screen类似功能的myscreen程序吧。",e.jsx("br",{}),e.jsx("span",{className:"QA",children:"A"}),"：TL;DR"]}),a.map(s=>{var r;return e.jsxs("section",{id:s.id,ref:n=>i.current[s.id]=n,className:"myscreen-section",children:[s.level===2?e.jsxs("h2",{children:[e.jsx("a",{href:`#${s.id}`,className:"anchor-link",children:"§"})," ",s.label]}):e.jsxs("h3",{children:[e.jsx("a",{href:`#${s.id}`,className:"anchor-link",children:"§"})," ",s.label]}),e.jsx("div",{className:"content",children:(r=o.get(s.id))==null?void 0:r.content})]},s.id)})]})}function L(){const i=d.useRef({});return e.jsxs(e.Fragment,{children:[e.jsx(_,{}),e.jsxs("div",{className:"myscreen-layout",children:[e.jsx(v,{sectionRefs:i}),e.jsx(T,{sectionRefs:i})]}),e.jsx(h,{})]})}l.createRoot(document.getElementById("root")).render(e.jsx(d.StrictMode,{children:e.jsx(w,{children:e.jsx(L,{})})}));
