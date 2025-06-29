import "./App.css";

function Header() {
    return (<>
        <header className="header">
            <div className="header-container">
                <h1>Lidong's Blog</h1>
                <nav className="header-nav">
                    <a href="/">Home</a>
                    <a href="post/index.html">Post</a>
                </nav>
            </div>
        </header>
    </>)
}

export default Header;