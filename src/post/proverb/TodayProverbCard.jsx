import "./Proverb.css";
import PropTypes from "prop-types";

function TodayProverbCard(props) {
    return (
        <div className="ProverbCard">
            <h4 className="Date">{props.date}</h4>
            <p className="Proverb">
                {props.proverb}
            </p>
            <p className="Author">
                -- {props.author}
            </p>
            <a href={props.href}>
                check for more
            </a>
        </div>
    );
}

TodayProverbCard.propTypes = {
    date: PropTypes.date,
    proverb: PropTypes.string,
    author: PropTypes.string,
    href: PropTypes.string,
}

export default TodayProverbCard;