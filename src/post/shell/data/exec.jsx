import CodeBox from "./CodeBox";
import "./Data.css"

function exec_content() {
    return (
        <div className="content">
            <code className="usage">exec [-cl] [-a name] [command [arguments]]</code>
            <p className="description">
                exec命令用来执行一个新的命令，并替换当前的shell进程。想想你用execv系统调用做了什么，exec命令会做同样的事情。
            </p>
            <p className="description">
                也许你想问，什么时候使用exec命令呢？通常在你想要结束shell脚本时使用， 比如下面使用exec的写法：
            </p>
            <CodeBox
                code={
`if [ -x /usr/bin/your-command ]
then
    exec /usr/bin/your-command
fi`}
                language="bash"
            />
            <p className="description">可以比不使用exec的写法：</p>
            <CodeBox
                code={
`if [ -x /usr/bin/your-command ]
then
    /usr/bin/your-command
    exit $?
fi`}
                language="bash"
            />
            <p className="description">
                少写一条exit命令。在shell脚本的最后一条语句前加上exec还有一个好处，就是可以让shell少执行一次fork系统调用（但是谁会关心shell的性能）。
            </p>
            <p className="description">
                exec的另一个常用的功能是重定位标准输入、输出和错误流。比如：
            </p>
            <CodeBox
                code={
`exec 1> /tmp/output.txt # 重定向标准输出到文件
# 此时执行ls会将输出写入/tmp/output.txt
exec 1>&2 # 重定向标准输出到标准错误`
                }
                language="bash"
            />
        </div>
    )
}

export default exec_content;