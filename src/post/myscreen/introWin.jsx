import window_prog_jpeg from "./window_prog.jpeg"
import window_shell_jpeg from "./window_shell.jpeg"
import screen_like_jpeg from "./screen_like.jpeg"
import "./myscreen.css"

function introWin() {
    return (<div>
        <p className="indent">
            古早时期，窗口=显示器。但现在，我们会在显示器中打开一大堆窗口，每个窗口中运行一个应用程序。一个应用程序的结构可以用下面这幅图片描述
        </p>
        <div style={{textAlign: "center"}}>
            <img
                src={window_prog_jpeg}
                alt="windows program frame"
                style={{width: "70%"}}
            ></img>
        </div>
        <p className="indent">
            为了让shell程序也可以运行到窗口上，人们开发了许多专门运行shell命令的窗口程序（比如iTerm，warp等等）。这些程序的结构如下所示
        </p>
        <div style={{textAlign: "center"}}>
            <img
                src={window_shell_jpeg}
                alt="windows shell frame"
                style={{width: "77%"}}
            ></img>
        </div>
        <p className="indent">
            看起来非常简单，对不对？不过你也许会问：什么是伪终端（英文简称是pty）？伪终端类似一个UNIX管道，并不是一个真实的设备。在上图中，前端（e.g. MacOS上的iTerm，下文用iTerm代表前端）把用户输入发送到伪终端，命令行程序就可以从stdin读取；命令行程序将输出写入stdout和stderr，iTerm就可以从伪终端中读取输出显示在窗口中。不过，除了具有管道的功能，伪终端还可以像正常的终端一样获取/设置窗口大小，设置各种各样的属性以及处理特殊字符。比如当iTerm被打开时，iTerm就会打开一个伪终端，设置伪终端的窗口大小为iTerm的默认窗口大小。如果iTerm发送CTRL-C到伪终端设备，伪终端设备也不会像管道一样发送CTRL-C供命令行程序读取，而是会发送SIGINT信号给命令行程序。
        </p>
        <p className="indent">
            Whew！说了这么多，终于可以谈谈screen这样的窗口管理程序该怎么实现了，一个简单的想法是这样
        </p>
        <div style={{textAlign: "center"}}>
            <img
                src={screen_like_jpeg}
                alt="screen frame"
                style={{width: "77%"}}
            ></img>
        </div>
        <p className="indent">
            这张图片中，screen程序作为前端，读取用户输入只需要在标准输入<code>STDIN_FILENO</code>上调用<code>read</code>，渲染窗口只需要把程序输出<code>printf</code>到标准输出（之后iTerm程序，会把标准输出的字符绘制到窗口中）。screen可以根据用户需求（e.g. <code>screen -a -t 0</code>）接入（attach）到一个伪终端，也可以离开（detach）当前伪终端，接入其他伪终端，这样就实现了窗口管理和切换。当然，实现screen要考虑的事情比上面说的其实还要多很多，但这篇博客中的实现会保持尽可能简单。myscreen虽然输出没有screen漂亮，不过管理和切换窗口的思想和screen是一致的。
        </p>
    </div>)
}

export default introWin;