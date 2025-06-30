import PropTypes from 'prop-types'
import "./Post.css"

function PostCard(props) {
    return (
        <div className="post-card">
            <img className="img" src={props.imgSrc} alt={props.imgAlt}></img>
            <a href={props.href}>
                <h2 className="title">{props.title}</h2>
            </a>
            <span className="text">{props.text}</span>
        </div>
    )
}

PostCard.propTypes = {
    imgSrc: PropTypes.string,
    imgAlt: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
}

export default PostCard;