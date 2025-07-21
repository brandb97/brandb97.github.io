import { StrictMode, useRef, useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import Header from "../../Header.jsx";
import Footer from "../../Footer.jsx";
import "./myscreen.css"

const sections = [
    { id: "introTerm", label: "终端" },
    { id: "introWin", label: "窗口管理" },
    { id: "startProg", label: "myscreen" },
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
        ["introTerm", { content: <div>终端是...</div> }],
        ["introWin", { content: <div>窗口管理程序是...</div> }],
        ["startProg", { content: <div>代码仓库在...</div> }],
    ]);
    return (
        <div className="myscreen-body">
            {sections.map((item) => (
                <section
                    key={item.id}
                    id={item.id}
                    ref={(el) => (sectionRefs.current[item.id] = el)}
                >
                    <h2>{item.label}</h2>
                    {body_contents_map.get(item.id)?.content}
                </section>
            ))}
        </div>
    );
}

function MyScreen() {
    const sectionRefs = useRef({});

    return (<>
        <Header></Header>
        <div className="flex-container">
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