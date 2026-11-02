import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="نَقلة — الرئيسية">
      <span className="brand-mark">
        <Icon name="route" size={25} />
      </span>
      <span className="brand-name">
        نَقلة<small>NAQLAH</small>
      </span>
    </Link>
  );
}
