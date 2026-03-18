import { FormConfig, OPTION_SOURCES } from "../../data/data";
import ss from "./Form.module.scss";
import Bubble, {
  BubbleButton,
  BubbleInput,
} from "../../../../shared/UI/Bubble/Bubble";
import FertilizerFormCard from "../FertilizerFormCard/FertilizerFormCard";

const Form = ({ formData, onInputChange, onSelectInput, onSelectOption }) => {
  return (
    <section className={`${ss.form} container`}>
      <form>
        <div className={ss.wrapper}>
          {FormConfig.map((card) => {
            return (
              <FertilizerFormCard
                card={card}
                style={ss}
                key={card.key}
                formData={formData}
                onSelectInput={onSelectInput}
                onSelectOption={onSelectOption}
                onInputChange={onInputChange}
              />
            );
          })}
        </div>
        <BubbleButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          Рассчитать
        </BubbleButton>
      </form>
    </section>
  );
};

export default Form;
