import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ShellTipsPosts from './TipsData.jsx';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import "../Post.css"

function ShellTips() {
    const [currentPage, setCurrentPage] = useState(0);
    const { title, content } = ShellTipsPosts[currentPage];

    return (<>
        <Header></Header>
        <div className='flex-container'>
            <div className='post-body'>
                <h1>{title}</h1>
                <div>{content}</div>
                <div className='button'>
                    <button
                        className='button-left'
                        onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                    >
                        上一页
                    </button>
                    <button
                        className='button-right'
                        onClick={() => setCurrentPage(p => Math.min(ShellTipsPosts.length - 1, p + 1))}
                        disabled={currentPage === ShellTipsPosts.length - 1}
                    >
                        下一页
                    </button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>);
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ShellTips />
    </StrictMode>,
)