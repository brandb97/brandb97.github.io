import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import wip from "../../assets/working-hard.gif"
import Header from "../../Header.jsx";
import Footer from "../../Footer.jsx";
import "../Post.css"

function MyScreen() {
    return (<>
        <Header></Header>
        <div className="post-body">
            <h1>🚧 施工中... 🚧</h1>
            <img
                src={wip}
                alt="work in progress gif"
                className="work-in-progress-img"
            >
            </img>
        </div>
        <Footer></Footer>
    </>)
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MyScreen />
    </StrictMode>,
)