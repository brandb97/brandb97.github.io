import "./myscreen.css"
import CodeBox from "../shell/data/CodeBox.jsx";

function CodeFrontEnd() {
    return (<div>
        <p className="indent">
            前端程序主要写在myscreen.c中，其中包括<code>main()</code>函数：负责初始化和CLI（解析命令行参数），以及<code>do_interact_window()</code>：用来和后端套接字交互。<code>main()</code>函数在解析完毕命令行参数后，首先初始化了一些signal handler，这些signal handle的作用是恢复终端的属性。这么做的目的是，前端为了只充当中转的作用，进入了raw模式，如果前端进程在运行中因为信号或者是某些调用发生了错误退出，应该在退出前恢复成正常的终端模式。否则，你会发现由于raw模式下不会把'\n'转换成'\n\r'，正常程序的输出在raw模式下会非常乱。假设用户没有输入--attach或者--list，那么<code>main()</code>在第15行把当前终端设置为raw模式，并把正常的终端属性保存到orign_termios。在第20行启动一个后台进程运行用户通过<code>argv</code>指定的命令，在第22行进入<code>do_interact_window()</code>和后端通过socket交互。
        </p>
        <CodeBox
            code={
`int main(int argc, char **argv)
{
\t/* parse options */
\tsignal(SIGWINCH, sigwinch_handler);
\tsignal(SIGABRT, reset_tty_sig);
\tsignal(SIGKILL, reset_tty_sig);
\tsignal(SIGINT, reset_tty_sig);
\tsignal(SIGTERM, reset_tty_sig);
\tatexit(reset_tty);
\twindows = window_vec_xalloc();
\twindow_vec_load(windows, screen_store);
\tif (mode == START) {
\t\tchar window_name[32] = { 0 };

\t\ttty_set_raw(STDIN_FILENO, &origin_termios);
\t\traw_mode = 1;
\t\ttty_get_winsize(STDIN_FILENO, &ws);
\t\tsnprintf(window_name, 32, "myscreen.%u",
\t\t\t (unsigned int)windows->nr);
\t\twin = window_xstart(window_name, &origin_termios, &ws, argv);

\t\ttask_ret = do_interact_window(win);
\t\tif (task_ret == 0)
\t\t\twindow_vec_add(windows, win);
\t\telse
\t\t\t/* Failed or killed */
\t\t\twindow_free(win);
\t} /* ignore attach and list for simplicity */
\twindow_vec_save(windows, screen_store);
\twindow_vec_free(windows);

\treset_tty();
}`
            }
            language="c"
        />
        <p className="indent">
            <code>do_interact_window()</code>做的事情非常简单，首先通过<code>socket_client_xstart()</code>和后端进程建立TCP连接，接着，把socket中的输出写到stdout（STDOUT_FILENO）中，把stdin（STDIN_FILENO）中的输入写到socket中。不过除了写入正常的用户输出，<code>do_interact_window()</code>中需要做三件事：1. 当窗口大小改变时（接收到SIGWINCH时），告诉后端进程新的窗口大小，如代码17-29行所示；2. 在接收到CTRL-a d时，返回0，表示后端进程仍然可以继续通信；3. 在接收到CTRL-a k时，杀死后端进程，返回-1，表示后端进程已经终止，可以释放资源。
        </p>
        <CodeBox
            code={
`static int do_interact_window(struct window *win)
{
\tint sock_fd, nfds;
\tchar sock_buf[256];
\tfd_set read_set;
\tint ret;

\tsock_fd = socket_client_start(win->socket);
\tif (sock_fd < 0) {
\t\tferror_raw("Error connecting to socket %s", win->socket);
\t\treturn -1;
\t}
\tnfds = sock_fd > STDIN_FILENO ? sock_fd + 1 : STDIN_FILENO + 1;
\tfor (;;) {
\t\tchar c;

\t\tif (window_ch) {
\t\t\tstruct winsize ws;
\t\t\tchar winch_buf[5] = { [0] = 'w' };
\t\t\tuint16_t *p = (uint16_t *)(winch_buf + 1);

\t\t\ttty_get_winsize(STDIN_FILENO, &ws);
\t\t\twindow_ch = 0;
\t\t\tp[0] = ws.ws_row;
\t\t\tp[1] = ws.ws_col;
\t\t\tif (write(sock_fd, winch_buf, 5) != 5)
\t\t\t\tFAIL(perror_raw(
\t\t\t\t\t"Error sending window change to socket"));
\t\t}

\t\tFD_ZERO(&read_set);
\t\tFD_SET(STDIN_FILENO, &read_set);
\t\tFD_SET(sock_fd, &read_set);
\t\tif (select(nfds, &read_set, NULL, NULL, NULL) < 0) {
\t\t\tif (errno == EINTR)
\t\t\t\tcontinue; /* Interrupted by signal, retry select
\t\t\t\t\t   */
\t\t\tFAIL(perror_raw(
\t\t\t\t"Error in select from STDIN and socket"));
\t\t}

\t\tif (FD_ISSET(sock_fd, &read_set)) {
\t\t\t/* read sock_fd and write to STDOUT_FILENO */
\t\t} else if (FD_ISSET(STDIN_FILENO, &read_set)) {
\t\t\tif (c != CTRL_A) {
\t\t\t\t/* read STDIN_FILENO and write to sock_fd */
\t\t\t}

\t\t\t/*
\t\t\t * c is CTRL-A, if the next char is 'd' or 'k', we
\t\t\t * detach or kill the window. Otherwise we ignore the
\t\t\t * next character.
\t\t\t */
\t\t\tif (read(STDIN_FILENO, &c, 1) != 1)
\t\t\t\tFAIL(perror_raw(
\t\t\t\t\t"Error reading char from STDIN after CTRL-A"));
\t\t\tswitch (c) {
\t\t\tcase DETACH:
\t\t\t\tret = 0;
\t\t\t\tferror_raw("Detach from window %s: pid %d",
\t\t\t\t\twin->name, win->pid);
\t\t\t\tgoto cleanup;
\t\t\tcase KILL:
\t\t\t\tkill(win->pid, SIGKILL);
\t\t\t\tret = -1;
\t\t\t\tferror_raw("Kill window %s: pid %d",
\t\t\t\t\twin->name, win->pid);
\t\t\t\tgoto cleanup;
\t\t\tdefault:
\t\t\t\t/* ignore unknown char */
\t\t\t\tbreak;
\t\t\t}
\t\t}
\t}

cleanup:
\tclose(sock_fd);
\treturn ret;
}
`
            }
            language="c"
        />
    </div>)
}

export default CodeFrontEnd;
