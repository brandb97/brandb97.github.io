import me_and_rust_image from "./assets/me_and_rust.jpg";
import birthday_png from "./assets/birthday.png";
import beer_png from "./assets/beer.png";
import TodayProverbCard from "./post/Proverb/TodayProverbCard";
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
        <h3>技术贴示</h3>
        <div style={{fontSize: "1.1em"}}>
            <h4 style={{textAlign: "center"}}>The usual way to compose a log message</h4>
            <h4 style={{textAlign: "center"}}>如何（为git commit）写提交摘要</h4>
            <p style={{
                marginLeft: "200px",
                textAlign: "center",
                fontStyle: "italic",
            }}>
                Junio C Hamano (git maintainer)
            </p>
            <p style={{
                marginLeft: "200px",
                textAlign: "center",
                fontStyle: "italic",
            }}>
                滨野纯 (开源项目git维护者)
            </p>
            <ul>
                <li> <span style={{fontWeight: "bold"}}>motivation（动机）</span>
                    <p>Give an observation on how the current system works in the present tense (so no need to say "Currently X is Y", or "Previously X was Y" to describe the state before your change; just "X is Y" is enough), and discuss what you perceive as a problem in it.</p>
                    <p>说明系统目前是怎么工作的（没有必要使用"Currently X is Y"或者"Previously X is Y"，直接说"X is Y"就可以）。然后说明你认为当前系统中存在什么问题。</p>
                </li>
                <li> <span style={{fontWeight: "bold"}}>proposal（解决方案）</span>
                    <p>Propose a solution (optional---often, problem description trivially leads to an obvious solution in reader's minds).</p>
                    <p>提供一个解决方案（可选。一般情况下，提出合理的问题后，解决方案就已经很明显）</p>
                </li>
                <li> <span style={{fontWeight: "bold"}}>implementation（实现）</span>
                    <p>Give commands to somebody editing the codebase to "make it so", instead of saying "This commit does X".</p>
                    <p>使用祈使句告诉读者如何写代码解决问题（写成“在X加入条件判断Y来完成Z”，而不要写成“本次提交为了完成Z在X加入了条件判断Y”）。</p>
                </li>
            </ul>
        </div>
        <h3>今日格言</h3>
        <TodayProverbCard
            date="2025-7-12"
            proverb="强者为弱者开辟道路，但是强者往往为弱者所奴役，就像是老人为了大腹便便的游客打鱼一样。"
            author="王晓波"
            href="/src/post/proverb/Proverb.html"
        />
        <h3>今日shell命令</h3>
        <ShortTip
            command="任务管理"
            usage="jobs && kill && wait && bg && fg ..."
            description="管理你创建的进程。"
            href="/src/post/shell/ShellTips.html?id=3"
        />
    </main>)
}

export default AboutMe;
