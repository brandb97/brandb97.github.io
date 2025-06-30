import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";
import "./Data.css"

function CodeBox(props) {
    return (
        <div className="code-box">
            <Highlight {...defaultProps} code={props.code} language={props.language} theme={theme}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })} style={{ display: 'table-row' }}>
                                <span style={{
                                    display: 'table-cell',
                                    textAlign: 'right',
                                    paddingRight: '1em',
                                    userSelect: 'none',
                                    opacity: 0.5,
                                    width: '2em',
                                }}>
                                    {i + 1}
                                </span>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );    
}

export default CodeBox;