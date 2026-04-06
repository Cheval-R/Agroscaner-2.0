import Bubble from "../../../../shared/UI/Bubble/Bubble";
import useCalculatorResult from "../../hooks/useCalculatorResult";
import ss from "./Result.module.scss";

const Result = () => {
  const { resultData } = useCalculatorResult();
  return (
    <section className={`${ss.result} container`}>
      <div className={ss.wrapper}>
        {resultData.map((card) => {
          return (
            <Bubble
              legend={card.label}
              key={card.key}
            >
              {card.dose?.kiloPerGa}
              {card.dose?.tonnePerField}
            </Bubble>
          );
        })}
      </div>
    </section>
  );
};

export default Result;
