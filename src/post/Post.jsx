import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import PostCard from "./PostCard.jsx";
import thinker from "./proverb/thinker.jpeg";
import bash_pic from "./shell/bash.jpeg";
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
        </div>
        <Footer></Footer>
    </>)
}

export default Post;