import "./backButton.css";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <Link to="/">
      <div className="div__button--back">
        <button className="button--back">بازگشت</button>
      </div>
    </Link>
  );
}

export default BackButton;
