import me_and_rust_image from "./assets/me_and_rust.jpg";
import birthday_png from "./assets/birthday.png";
import beer_png from "./assets/beer.png";
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
            我叫闫立栋，是一名南京大学的研究生，我的导师是<a href="https://qingkaishi.github.io">时清凯</a>。
            他正在指导我完成一个用来检测内存泄漏的静态分析器。
        </p>
        <p>
            作为一名程序员，我生活的一大乐趣来源于“探索”和“创造”。我喜欢阅读一切有趣的，未知的代码。作为工作的一部分，
            我还会经常性的创造大量充满BUG的代码。
        </p>
        <p>
            工作之外，我还对下面的事情感兴趣：
            <ul>
                <li>电影：我曾经喜欢读书，但电影会给我带来更多的刺激感</li>
                <li>口琴：半音阶口琴，可惜连单音都吹不准</li>
                <li>啤酒：🍺，干杯！这是我唯一擅长的事情</li>
                <li>摇滚音乐：AC/DC是我最喜欢的乐队之一</li>
                <li>写作：为了记录，分享和了解自己</li>
            </ul>
        </p>
    </main>)
}

export default AboutMe;