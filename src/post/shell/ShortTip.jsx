import "./Shell.css"

function ShortTip(props) {
  return (
    <div className="short-shell-tip">
        <h1>{props.command}</h1>
        <code>{props.usage}</code>
        <p>{props.description}</p>
        <a href={props.href}>
            check for more
        </a>
    </div>
  );
}

export default ShortTip;