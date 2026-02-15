import styles from "./CalculatorTitle.module.scss";
const CalculatorTitle = ({ children }) => {
  return <h2 className={styles.calculatorTitle}>{children}</h2>;
};

export default CalculatorTitle;
