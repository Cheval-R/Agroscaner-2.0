import Bubble, { BubbleInput } from "../../../../shared/UI/Bubble/Bubble";
import Select from "../../../../shared/UI/Select/Select";
import { OPTION_SOURCES } from "../../data/data";

const FertilizerFormCard = ({
  card,
  style,
  formData,
  onSelectInput,
  onSelectOption,
  onInputChange,
}) => {
  return (
    <Bubble
      legend={card.label}
      className={style.card}
    >
      {card.inputs.map((input) => {
        if (input.type === "select") {
          return (
            <Select
              key={input.key}
              optionsList={OPTION_SOURCES[input.source]}
              value={formData.ui.selectQueries[card.key][input.key]}
              activeKey={formData.form[card.key][input.key]}
              legend={input.label}
              onChange={(event) => {
                onSelectInput(card.key, input.key, event.target.value);
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
              inputType={input.inputType}
              onChange={(event) => {
                onInputChange(card.key, input.key, event.target.value);
              }}
            />
          );
        }
      })}
    </Bubble>
  );
};

export default FertilizerFormCard;
