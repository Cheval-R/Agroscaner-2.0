import { FormConfig, OPTION_SOURCES } from "../../data/data";
import ss from "./Form.module.scss";
import Bubble, {
  BubbleButton,
  BubbleInput,
} from "../../../../shared/UI/Bubble/Bubble";
import Select from "../../../../shared/UI/Select/Select";

const Form = ({ formData, onInputChange, onSelectInput, onSelectOption }) => {
  return (
    <section className={`${ss.form} container`}>
      <form>
        <div className={ss.wrapper}>
          {FormConfig.map((card) => {
            return (
              <Bubble
                key={card.key}
                legend={card.label}
                className={ss.card}
              >
                {card.inputs.map((input) => {
                  if (input.type === "select") {
                    return (
                      <Select
                        key={input.key}
                        optionsList={OPTION_SOURCES[input.source]}
                        value={formData.ui.selectQueries[input.key]}
                        legend={input.label}
                        onChange={(event) => {
                          onSelectInput(
                            card.key,
                            input.key,
                            event.target.value,
                          );
                        }}
                        onOptionSelect={(option) => {
                          onSelectOption(card.key, input.key, option);
                        }}
                      />
                    );
                  }
                  if (input.type === "input") {
                    return (
                      <BubbleInput
                        key={input.key}
                        value={formData.form[card.key][input.key]}
                        legend={input.label}
                        onChange={(event) => {
                          onInputChange(
                            card.key,
                            input.key,
                            event.target.value,
                          );
                        }}
                      />
                    );
                  }
                })}
              </Bubble>
            );
          })}
        </div>
        <BubbleButton
          onClick={() => {
            console.log(formData);
          }}
        >
          Push ME
        </BubbleButton>
      </form>
    </section>
  );
};

export default Form;
