import flagImg from "../assets/bg-flags.png";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src={flagImg} alt="country flags on a banner" />
      <h1>Country Information</h1>
    </header>
  );
}
