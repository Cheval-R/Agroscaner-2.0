import ss from "./Burger.module.scss";
import { BubbleButton } from "../Bubble/Bubble";
// import { useProgramContext } from "../../Context/AppContext";

const Burger = ({ isOpen, onClick }) => {
  return (
    <BubbleButton
      className={ss.burgerButton}
      onClick={onClick}
    >
      <span className={`${ss.burger} ${isOpen ? ss.burgerActive : ""}`}></span>
    </BubbleButton>
  );
};

export default Burger;
