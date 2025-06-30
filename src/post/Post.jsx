import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import PostCard from "./PostCard.jsx";
import './Post.css';

function Post() {
    return (<>
        <Header></Header>
        <div className="post-main">
            <PostCard
                imgSrc="proverb/thinker.jpeg"
                imgAlt="Thinker"
                title="格言集"
                text="我最近的格言分享"
                href="proverb/Proverb.html"
            />
            <PostCard
                imgSrc="shell/bash.jpeg"
                imgAlt="Bash"
                title="shell tips"
                text="我的bash小技巧"
                href="shell/ShellTips.html"
            />
        </div>
        <Footer></Footer>
    </>)
}

export default Post;