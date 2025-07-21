import { StrictMode, useRef, useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import Header from "../../Header.jsx";
import Footer from "../../Footer.jsx";
import introTerm from "./introTerm.jsx";
import introWin from "./introWin.jsx";
import introCode from "./introCode.jsx"
import "./myscreen.css"

const sections = [
    { id: "introTerm", label: "终端" },
    { id: "introWin", label: "窗口管理" },
    { id: "introCode", label: "myscreen" },
];

function MyScreenToC({ sectionRefs }) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -60% 0px",
                threshold: 0,
            }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    console.log("hello" + activeId);

    return (<aside>
        <ul className="myscreen-toc">
            {sections.map((section) => (
                <li key={section.id}>
                    <a
                        className={activeId === section.id ? "active" : ""}
                        href={`#${section.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            sectionRefs.current[section.id]?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        {section.label}
                    </a>
                </li>
            ))}
        </ul>
    </aside>)
}

function MyScreenBody({ sectionRefs }) {
    const body_contents_map = new Map([
        ["introTerm", { content: introTerm() }],
        ["introWin", { content: introWin() }],
        ["introCode", { content: introCode() }],
    ]);
    return (
        <div className="myscreen-body">
            <h1>MyScreen: 编写一个简单的screen程序</h1>
            <div className="notice">
                👉 <code>myscreen</code>的代码在<a href="https://github.com/brandb97/myscreen.git">这个仓库</a>
            </div>
            <p className="content">
                <span className="QA">Q</span>：如果你正在命令行窗口中工作，比如你打开了一个bash窗口。这时你准备做机器学习的课程实验，而实验结果需要几个小时才能跑完。你希望可以一边运行实验，一边在bash中处理手头的其他工作，你会怎么做？<br/>
                <span
                    className="QA">A</span>：我会用bg命令让实验脚本在后台运行，或者我干脆新开一个bash窗口运行实验脚本。<br/>
                <span className="QA">Q</span>：可是实验必须在远程服务器上完成，如果你的机器学习老师疯了，给你们安排的实验需要运行12个小时，但是你没法12个小时都在远程服务器上保持登陆状态，你该怎么办？<br/>
                <span className="QA">A</span>：我敢肯定南京大学的老师不会这么做的......<br/>
                <span className="QA">Q</span>：You never know！<br/>
                <span className="QA">A</span>：好吧，假设现实真的如此，我碰巧知道当退出bash时，bash会向所有后台程序发送SIGHUP信号。让实验脚本忽略SIGHUP很简单，使用nohup......<br/>
                <span className="QA">Q</span>：你的老师不准你安装nohup<br/>
                <span className="QA">A</span>：你是不是想让我说screen<br/>
                <span className="QA">Q</span>：exactly！screen可以新建一个窗口，并在这个窗口中运行任何程序。按下CTRL-A d就可以让这个窗口在后台运行，即使退出登陆也没有关系。接下来，让我给你讲讲怎么样写一个具有和screen类似功能的myscreen程序吧。<br/>
                <span className="QA">A</span>：TL;DR
            </p>
            {sections.map((item) => (
                <section
                    key={item.id}
                    id={item.id}
                    ref={(el) => (sectionRefs.current[item.id] = el)}
                    className="myscreen-section"
                >
                    <h2>
                        <a href={`#${item.id}`} className="anchor-link">§</a> {item.label}
                    </h2>

                    <div className="content">
                        {body_contents_map.get(item.id)?.content}
                    </div>
                </section>
            ))}
        </div>
    );
}

function MyScreen() {
    const sectionRefs = useRef({});

    return (<>
        <Header></Header>
        <div className="myscreen-layout">
            <MyScreenToC sectionRefs={sectionRefs}></MyScreenToC>
            <MyScreenBody sectionRefs={sectionRefs}></MyScreenBody>
        </div>
        <Footer></Footer>
    </>)
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <MyScreen />
        </BrowserRouter>
    </StrictMode>,
)