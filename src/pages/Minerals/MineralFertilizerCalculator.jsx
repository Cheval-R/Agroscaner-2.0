import Select from "../../components/UI/Select/Select";
import ss from "./MineralFertilizerCalculator.module.scss";
import Bubble, { BubbleInput } from "../../components/UI/Bubble/Bubble";
import useFertilizerForm from "./hooks/useFertilizerForm";
import { NUTRIENTS } from "./data/data";

const MineralFertilizerCalculator = () => {
  const {
    fertilizerFrom,
    selectSearch,
    onParamChange,
    onSearchQueryChange,
    onOptionSelect,
  } = useFertilizerForm();

  return (
    <section className="container">
      <div className={ss.cardsWrapper}>
        {NUTRIENTS.map((fertilizer) => {
          return (
            <Bubble
              className={ss.fertilizerCard}
              legend={`${fertilizer.label}`}
              key={fertilizer.key}
            >
              <BubbleInput
                id={`${fertilizer.key}-value`}
                value={fertilizerFrom[fertilizer.key].soilValue}
                onChange={(event) => {
                  onParamChange(
                    event.target.value,
                    fertilizer.key,
                    "soilValue",
                  );
                }}
                legend={"В почве, мг/кг"}
              />
              <Select
                optionsList={fertilizer.options}
                value={selectSearch[`${fertilizer.key}Query`]}
                onChange={(event) => {
                  onSearchQueryChange(fertilizer.key, event.target.value);
                }}
                onOptionSelect={(key) => {
                  onOptionSelect(fertilizer.key, key);
                }}
                legend={"Удобрение"}
              />
              <BubbleInput
                id={`${fertilizer.key}-price`}
                value={fertilizerFrom[fertilizer.key].price}
                onChange={(event) => {
                  onParamChange(event.target.value, fertilizer.key, "price");
                }}
                legend={"Стоимость, ₽"}
              />
            </Bubble>
          );
        })}
      </div>
    </section>
  );
};

export default MineralFertilizerCalculator;
