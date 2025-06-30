import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProverbCard from './ProverbCard.jsx';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import '../Post.css'

function Proverb() {
    return (<>
        <Header></Header>
        <div className='proverb-body'>
            <ProverbCard
                date="2025-6-29"
                proverb="The greatest way to live with honor in this world is to be what we pretend to be."
                author="Socrates"
            />
            <ProverbCard
                date="2025-6-30"
                proverb="The misfortune of the wise is better than the prosperity of the fool."
                author="Epicurus"
            />            
        </div>
        <Footer></Footer>
    </>);
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Proverb />
    </StrictMode>,
)