function exec_content() {
    return (
        <div className="content">
            <code className="usage">exec [-cl] [-a name] [command [arguments]]</code>
            <p className="description">
                exec命令用来执行一个新的命令，并替换当前的shell进程。想想你用execv系统调用做了什么，
                exec命令会做同样的事情。
            </p>
        </div>
    )
}

export default exec_content;