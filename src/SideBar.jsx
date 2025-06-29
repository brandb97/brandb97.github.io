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
                            alt="github"
                        />
                        <span>github</span>
                    </a>
                    <a
                        href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1799513674&website=www.oicqzone.com"
                        className="social-link"
                    >
                        <img
                            src="https://img.icons8.com/color/48/000000/qq.png"
                            alt="qq"
                        />
                        <span>qq</span>
                    </a>
                    <a
                        href="mailto:yldhome2d2@gmail.com"
                        className="social-link"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                            alt="my gmail"
                        />
                        <span>gmail</span>
                    </a>
                    <a
                        href="mailto:502024330056@smail.nju.edu.cn"
                        className="social-link"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                            alt="my school email"
                        />
                        <span>school email</span>
                    </a>
                </li>
            </ul>
        </aside>
    </>)
}

export default SideBar;