import "../assets/main.css";
import github from "../assets/images/github.svg";
import linkedin from "../assets/images/linkedin.svg";

export default () => {
    return (
        <div className="footer">
            <p>Dados retirados do Jikan API</p>
            <div className="social">
                <a
                    href="https://github.com/gherrerar"
                    target="_blank"
                    title="GitHub"
                >
                    <img src={github} alt="GitHub" />
                </a>
                <a
                    href="https://www.linkedin.com/in/gherrerar/"
                    target="_blank"
                    title="LinkedIn"
                >
                    <img src={linkedin} alt="LinkedIn" />
                </a>
            </div>
        </div>
    );
};
