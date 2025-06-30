import "./Proverb.css";
import PropTypes from "prop-types";

function ProverbCard(props) {
    return (
        <div className="ProverbCard">
            <h4 className="Date">{props.date}</h4>
            <p className="Proverb">
                {props.proverb}
            </p>
            <p className="Author">
                -- {props.author}
            </p>
        </div>
    );
}

ProverbCard.propTypes = {
    date: PropTypes.date,
    proverb: PropTypes.string,
    author: PropTypes.string,
}

export default ProverbCard;