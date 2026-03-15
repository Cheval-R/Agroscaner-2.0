import Bubble, { BubbleInput } from "../../../../components/UI/Bubble/Bubble";
import Select from "../../../../components/UI/Select/Select";
import { Fertilizers } from "../../data/data";

const FertilizerFormCard = ({
  cardClass,
  fertilizerData,
  fertilizerForm,
  selectQueries,
  onParamChange,
  onSearchQueryChange,
  onOptionSelect,
}) => {
  return (
    <Bubble
      className={cardClass}
      legend={`${fertilizerData.label}`}
    >
      <BubbleInput
        value={fertilizerForm[fertilizerData.key].soilValue}
        onChange={(event) => {
          onParamChange(event.target.value, fertilizerData.key, "soilValue");
        }}
        legend={"В почве, мг/кг"}
      />
      <Select
        optionsList={fertilizerData.options}
        value={selectQueries[`${fertilizerData.key}Query`]}
        onChange={(event) => {
          onSearchQueryChange(fertilizerData.key, event.target.value);
        }}
        onOptionSelect={(key) => {
          onOptionSelect(Fertilizers, key, fertilizerData.key);
        }}
        legend={"Удобрение"}
      />
      <BubbleInput
        value={fertilizerForm[fertilizerData.key].price}
        onChange={(event) => {
          onParamChange(event.target.value, fertilizerData.key, "price");
        }}
        legend={"Стоимость, ₽"}
      />
    </Bubble>
  );
};

export default FertilizerFormCard;
