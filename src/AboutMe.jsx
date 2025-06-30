import me_and_rust_image from "./assets/me_and_rust.jpg";
import birthday_png from "./assets/birthday.png";
import beer_png from "./assets/beer.png";
import ProverbCard from "./post/Proverb/ProverbCard";
import ShortTip from "./post/shell/ShortTip";
import "./App.css"

function AboutMe() {
    return (<main>
        <img
            src={me_and_rust_image}
            alt="me_and_rust"
            className="header-pic"
        />
        <img
            src={birthday_png}
            alt="birthday"
            className="header-pic"
        />
        <img
            src={beer_png}
            alt="beer"
            className="header-pic"
        />
        <p>
            我叫闫立栋，一名南京大学的研究生。我的导师是<a href="https://qingkaishi.github.io">时清凯</a>教授，
            一位编译器专家。在他的指导下，我正在（开心但艰难的）构建一个静态分析漏洞检测器。<br/>
            除此之外，我对<a href="https://git-scm.com">git</a>也很有兴趣。你可以在
            <a href="https://lore.kernel.org/git/?q=Lidong+Yan">git邮件列表</a>中查看我贡献的代码。
        </p>
        <p>
            工作之外，我还对下面的事情感兴趣：
            <ul>
                <li>电影：为了看见我不曾拥有的现在，过去和未来</li>
                <li>口琴：我正在（三天打鱼，两天晒网的）练习半音阶口琴</li>
                <li>啤酒：🍺，干杯！这是我唯一擅长的事情</li>
                <li>摇滚音乐：AC/DC是我最喜欢的乐队之一，Rock n' Roll Ain't Noise Pollution</li>
                <li>写作：为了记录，分享和了解自己</li>
            </ul>
        </p>
        <h3>今日格言</h3>
        <ProverbCard
            date="2025-6-30"
            proverb="The misfortune of the wise is better than the prosperity of the fool."
            author="Epicurus"
        />
        <h3>今日shell命令</h3>
        <ShortTip
            command="hash"
            usage="hash [-r] [-p filename] [-dt] [name]"
            description="hash命令用来缓存命令的路径，以加快后续的查找速度。"
            href="/src/post/shell/ShellTips.html?id=2"
        />
    </main>)
}

export default AboutMe;