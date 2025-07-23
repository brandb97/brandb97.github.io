import CodeBox from "../shell/data/CodeBox.jsx"

function IntroCode() {
    return (<div>
        <p className="indent">
            终于，我们可以看看该怎么写代码了。你可以在<a href="https://github.com/brandb97/myscreen">这里</a>下载一份myscreen的代码。然后运行<code>make</code>得到一份可执行文件<code>myscreen</code>。
        </p>
        <CodeBox
            code={
`git clone https://github.com/brandb97/myscreen
cd myscreen
make
./myscreen`
            }
            language="bash"
        />
        <p>这时你应该已经进入了一个bash界面了，按下CTRL-A d就可以和bash分离。如果你想继续刚才的工作，运行下面的命令</p>
        <CodeBox
            code={
`./myscreen -l # 列出所有窗口信息
./myscreen -a 0 # attach到第0个窗口
# 或者试试./myscreen -a myscreen.0，表示attach到名字是myscreen.0的窗口`
            }
            language="bash"
        />
        <p>如果你想在窗口中运行指定的程序，比如vim，试试下面的命令，不出意外的话，myscreen会在新窗口中打开vim编辑器。🎉Hooray!</p>
        <CodeBox
            code={
`# ./myscreen cmd args...，新建一个窗口并在这个窗口中运行cmd args...
./myscreen vim`
            }
            language="bash"
        />
    </div>)
}

export default IntroCode;