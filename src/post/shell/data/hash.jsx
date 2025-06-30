import CodeBox from "./CodeBox";
import "./Data.css"

function hash_content() {
    return (
        <div className="content">
            <code className="usage">hash [-r] [-p filename] [-dt] [name]</code>
            <p className="description">
                hash命令用来缓存命令的路径，以加快后续的查找速度。试试下面这段代码：
            </p>
            <CodeBox
                code={
`$ hash ls
$ hash -t ls
/bin/ls`}
                language="bash"
            />
            <p className="description">
                这段代码首先使用hash命令从$PATH中找到并缓存了ls命令的路径，然后使用hash -t命令查看缓存的ls
                的路径。也许你觉得这没什么用处（为什么我要关心shell的性能？），不过一个hash有用的选项是
            </p>
            <code className="usage">hash -p /path/to/you/command command</code>
            <p className="description">
                这个选项可以让你指定一个命令的路径，并将其缓存起来。例如，如果你想让shell使用你自定义
                的ls命令，可以这样做：
            </p>
            <code className="usage">hash -p /home/mike/bin/ls ls</code>
            <p className="description">
                而不需要export $PATH。除了缓存命令，你还可以用<code>hash -r</code>清除所有
                缓存的命令路径，或者<code>hash -d command</code>清除一个缓存。
            </p>
        </div>
    )
}

export default hash_content;