import './App.css'
import Header from "./Header.jsx";
import SideBar from "./SideBar.jsx";
import AboutMe from "./AboutMe.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <>
        <Header />
        <div className="flex-container">
            <SideBar />
            <AboutMe />
        </div>
        <Footer />
    </>
  )
}

export default App
