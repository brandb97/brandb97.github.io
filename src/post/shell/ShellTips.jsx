import { StrictMode, useState, useEffect } from 'react'
import { BrowserRouter, useSearchParams } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import ShellTipsPosts from './TipsData.jsx';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import "../Post.css"

function ShellTips() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [currentPage, setCurrentPage] = useState(0);
    const postId = Math.max(0, Math.min(ShellTipsPosts.length - 1, parseInt(id ?? "1", 10) - 1));
    useEffect(() => {
        setCurrentPage(postId);
    }, []);
    const { title, content } = ShellTipsPosts[currentPage];

    return (<>
        <Header></Header>
        <div className='flex-container'>
            <div className='post-body'>
                <div className='warning'>
                    💡请在 <code>bash</code> 下执行该命令。
                </div>
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
        <BrowserRouter>
            <ShellTips />
        </BrowserRouter>
    </StrictMode>,
)