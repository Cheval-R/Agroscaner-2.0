import Bubble, { BubbleInput } from "../../../../components/UI/Bubble/Bubble";

const FieldFormCard = ({
  fertilizerData,
  fertilizerForm,
  selectQueries,
  onParamChange,
  onSearchQueryChange,
  onOptionSelect,
  cardClass,
}) => {
  return (
    <Bubble
      legend="Поле"
      className={cardClass}
    >
      <BubbleInput legend="Площадь" />
      <BubbleInput legend="Урожай" />
      <BubbleInput legend="Культура" />
    </Bubble>
  );
};

export default FieldFormCard;
