import Github from "lucide-react";

function SideBar() {
    return (<>
        <aside>
            <ul>
                <li>
                    <a
                        href="https://github.com/brandb97"
                    >
                        <Github size={18}/> <span>GitHub</span>
                    </a>
                </li>
            </ul>
        </aside>
    </>)
}

export default SideBar;