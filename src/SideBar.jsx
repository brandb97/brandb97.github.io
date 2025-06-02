import "./App.css"

function SideBar() {
    return (<>
        <aside>
            <ul className="side-bar">
                <li>
                    <a
                        href="https://github.com/brandb97"
                        className="social-link"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            alt="GitHub"
                        />
                        <span>GitHub</span>
                    </a>
                    <a
                        href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1799513674&website=www.oicqzone.com"
                        className="social-link"
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/qq.png"
                            alt="QQ"
                        />
                        <span>QQ</span>
                    </a>
                </li>
            </ul>
        </aside>
    </>)
}

export default SideBar;