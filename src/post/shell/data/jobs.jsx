import CodeBox from "./CodeBox";
import "./Data.css"

function jobs_content() {
    return (<>
        <div className="content">
            <p className="description">
                你也许会问什么是任务管理？任务管理是指你可以在shell中启动进程，杀死进程，等待进程，挂起进程等等。换句话说，你可以管理你创建的进程。
            </p>
            <p className="description">
                管理进程的命令有：jobs，列出进程信息；kill，向进程发送信号；wait，等待进程终止；bg，前台运行进程；fg，后台运行进程；disown，分离进程；suspend，暂停（挂起）当前shell。
            </p>
            <p className="description">
                因为这是一个tips，而不是tl;dr，介绍每个命令实在太多，这里介绍一个kill有趣的用法：
            </p>
            <CodeBox
                code={
                    `$ kill -l`
                }
                language="bash"
            />
            <p className="description">
                你会看到kill可以发送的所有信号，试试下面的命令。kill -l 9表示列出9对应的信号——SIGKILL。
            </p>
            <CodeBox
                code={
`$ kill -l 9
KILL`
                }
                language="bash"
            />
        </div>
    </>)
}

export default jobs_content;
