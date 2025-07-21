import "./Data.css";
import wip from '../../../assets/working-hard.gif';

function script_content() {
    return (<div>
        <h1>🚧 施工中... 🚧</h1>
        <img
            src={wip}
            alt="work in progress gif"
            className="work-in-progress-img"
        >
        </img>
    </div>)
}

export default script_content;