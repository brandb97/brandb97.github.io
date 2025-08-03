import "./myscreen.css"
import CodeBox from "../shell/data/CodeBox.jsx"

function controlTerm () {
    return (<div>
        <p className="indent">
            虽然大部分程序不关心文件描述符是什么设备，但也存在一些程序就是针对终端编写的，比如vim。想想vim要如何实现页面滚动的功能呢？首先，vim需要告诉终端驱动程序关闭行缓冲功能。在默认情况下，终端驱动程序会在用户按下ENTER时才把输入发送给应用程序，但对于vim，如果我们每次要到按“下箭头+ENTER”才能向下滚动显然很不方便。其次，在读取到用户输入的下箭头之后，vim需要结合光标的位置和终端显示器的宽度判断是否需要滚动页面，所以vim还需要通过系统调用获取终端显示器的大小。在UNIX系统中，用来获取和设置终端属性的系统调用如下所示：
        </p>
        <CodeBox
            code={
`/* 获取终端属性，e.g.是否行缓冲 */
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
    fprintf(stderr, "读取终端窗口大小错误\\n");`
            }
            language="c"
        />
        <p className="indent">
            抛开vim不谈，你是否想过当按你下CTRL-C时为什么可以让程序终止呢？当用户输入了CTRL-C，终端驱动并不会将CTRL-C放到输入缓冲区供程序读取，取而代之的事情是，终端驱动会向程序发送SIGINT，从而导致程序终止。那么，如何让终端驱动不要这么做呢？你可以使用系统调用<code>tcsetattr</code>，或者更简单的，你可以使用<code>stty</code>命令：
        </p>
        <CodeBox
            code={
`stty -isig   # 不允许特殊字符发送信号
stty isig    # 恢复特殊字符发送信号
stty intr ^L # 设置中断信号对于的字符是CTRL-L`
            }
            language="bash"
        />
        <p className="indent">
            说了这么多，大家应该明白：除了读写操作，终端文件描述符和普通文件描述符的区别很大。比如我们可以用上面提到的系统调用从终端文件描述符中获取许多普通文件描述符中没有的信息。但是普通文件符能做的<code>lseek</code>（将磁盘读写头移到文件的某个指定位置），则对于终端设备没有意义。
        </p>
    </div>)
}

export default controlTerm;