import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import PostCard from "./PostCard.jsx";
import thinker from "./proverb/thinker.jpeg";
import bash_pic from "./shell/bash.jpeg";
import git_pic from "../assets/git.png"
import old_computer_pic from "./myscreen/old_computer.jpeg"
import './Post.css';

function Post() {
    return (<>
        <Header></Header>
        <div className="post-main">
            <PostCard
                imgSrc={thinker}
                imgAlt="Thinker"
                title="格言集"
                text="我最近的格言分享"
                href="/src/post/proverb/Proverb.html"
            />
            <PostCard
                imgSrc={bash_pic}
                imgAlt="Bash"
                title="shell tips"
                text="我的bash小技巧"
                href="/src/post/shell/ShellTips.html"
            />
            <PostCard
                imgSrc={git_pic}
                imgAlt="Git"
                title="How git diff works"
                text="来看看git~v1.5.3中的diff命令吧"
                href="/src/post/git-diff/git-diff.html"
            />
            <PostCard
                imgSrc={old_computer_pic}
                imgAlt="my screen command"
                title="self-made screen command"
                text="编写一个简单的screen命令"
                href="/src/post/myscreen/myscreen.html"
            />
        </div>
        <Footer></Footer>
    </>)
}

export default Post;