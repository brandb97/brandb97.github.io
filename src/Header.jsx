import "./App.css";

function Header() {
    return (<>
        <header className="header">
            <div className="header-container">
                <h1>Lidong's HomePage</h1>
                <nav className="header-nav">
                    <a href="/">Home</a>
                    <a href="/post">Post</a>
                </nav>
            </div>
        </header>
    </>)
}

export default Header;