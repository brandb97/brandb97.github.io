import CodeBox from '../shell/data/CodeBox.jsx';
import "./myscreen.css"

function codeDaemon() {
    return (<div>
        <p className="indent">
            你是否还记得博客开头的对话，如果用户登出，如何让进程继续运行？对于后端，我们面临着同样的问题，我们希望后端程序一直监听套接字，等待前台进程的连接，并且不要因为用户退出就终止。如果你熟悉UNIX系统，你也许已经猜到要用<code>setsid</code>系统调用。<code>setsid</code>表示开启一个新会话。一个会话（session）通常和一个终端相关联，当用户退出终端时，终端驱动会向所有属于该会话的进程发送SIGHUP。开启一个新会话就意味着不会收到SIGHUP，于是后端进程就可以永远运行了。后端进程的代码主要写在window.c中的<code>do_interact_window()</code>中。<code>do_interact_window()</code>首先开启一个新会话成为守护进程，接着在伪终端上fork+exec一个用户指定的（或默认bash）shell命令，随后启动套接字服务器，允许前端进行连接。在第27行和前端连接成功后，<code>do_interact_window()</code>可能做三件事：1. 从套接字读出一个用户输入的字符发送给伪终端；2. 从伪终端读出程序输出，通过套接字发送给前端；3. 从套接字读出新的窗口大小，设置伪终端窗口大小，这会导致所有运行在伪终端上的程序（比如vim）都收到SIGWINCH信号。
        </p>
        <CodeBox
            code={
                `static void do_window_task(struct pty_info *pty_info, char *socket_path,
\t\t\t   struct termios *termios, struct winsize *ws,
\t\t\t   char **argv)
{
\tint master_fd, socket_fd;

\tif (setsid() <= 0)
\t\tperror_raw_die("Error creating new session in window task");

\tmaster_fd = pty_info->master_fd;
\t/* Start a socket daemon listen on socket_path */
\tsocket_fd = socket_server_xstart(socket_path);
\t/* Start a child process runs on pty */
\tpty_xexec(pty_info, termios, ws, argv);

\t/*
\t * This for loop never breaks, this daemon only exit when receive
\t * a SIGKILL signal.
\t */
\tfor (;;) {
\t\tint cfd, nfds;
\t\tchar socket_buf[4];
\t\tchar pty_buf[257];
\t\tfd_set read_fds;

\t\t/* Start a connection */
\t\tcfd = socket_server_xaccept(socket_fd);
\t\tnfds = cfd > master_fd ? cfd + 1 : master_fd + 1;

\t\tfor (;;) {
\t\t\tint n;

\t\t\tFD_ZERO(&read_fds);
\t\t\tFD_SET(cfd, &read_fds);
\t\t\tFD_SET(master_fd, &read_fds);
\t\t\tif (select(nfds, &read_fds, NULL, NULL, NULL) < 0) {
\t\t\t\tif (errno == EINTR)
\t\t\t\t\tcontinue; /* Interrupted by signal,
\t\t\t\t\t\t     retry select */
\t\t\t\tperror_raw(
\t\t\t\t\t"Error in select on socket and pty master");
\t\t\t}

\t\t\tif (FD_ISSET(cfd, &read_fds)) {
\t\t\t\t/* Read from socket */
\t\t\t\tn = read(cfd, socket_buf, 1);
\t\t\t\tif (n < 0)
\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t"Error reading from socket");
\t\t\t\telse if (n == 0) {
\t\t\t\t\t/*
\t\t\t\t\t * This means \`myscreen\` detach from
\t\t\t\t\t * this window, so break and wait for
\t\t\t\t\t * the next connection
\t\t\t\t\t */
\t\t\t\t\tclose(cfd);
\t\t\t\t\tbreak;
\t\t\t\t}

\t\t\t\tswitch (socket_buf[0]) {
\t\t\t\tcase CHAR_MODE:
\t\t\t\t\tif (read(cfd, socket_buf, 1) != 1)
\t\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t\t"Error reading char from socket");
\t\t\t\t\tif (write(master_fd, socket_buf, 1) !=
\t\t\t\t\t    1)
\t\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t\t"Error writing char to pty master");
\t\t\t\t\tbreak;
\t\t\t\tcase WINCH_MODE:
\t\t\t\t\tif (read(cfd, socket_buf, 4) != 4)
\t\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t\t"Error reading window size from socket");
\t\t\t\t\tpty_xset_winsize(master_fd, socket_buf);
\t\t\t\t\tbreak;
\t\t\t\tdefault:
\t\t\t\t\tferror_raw_die(
\t\t\t\t\t\t"Unknown command from socket: %c",
\t\t\t\t\t\tsocket_buf[0]);
\t\t\t\t}
\t\t\t}

\t\t\tif (FD_ISSET(master_fd, &read_fds)) {
\t\t\t\t/* Read from pty master */
\t\t\t\tn = read(master_fd, pty_buf,
\t\t\t\t\t sizeof(pty_buf) - 1);
\t\t\t\tif (n < 0)
\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t"Error reading from pty master");
\t\t\t\telse if (n == 0) {
\t\t\t\t\tferror_raw("PTY closed");
\t\t\t\t\texit(EXIT_SUCCESS);
\t\t\t\t}
\t\t\t\tif (write(cfd, pty_buf, n) != n)
\t\t\t\t\tperror_raw_die(
\t\t\t\t\t\t"Error writing to socket from pty master");
\t\t\t}
\t\t}
\t}
}`
            }
            language="c"
        />
    </div>)
}

export default codeDaemon;
