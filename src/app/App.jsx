import Header from "./layouts/Header/Header";
import { useProgramContext } from "./providers/AppContext";
import CornSilageHarvestCalculator from "../pages/Corn/CornSilageHarvestCalculator";
import MineralFertilizerCalculator from "../pages/Minerals/MineralFertilizerCalculator";
import NitrogenFeedingCalculator from "../pages/Nitrogen/NitrogenFeedingCalculator";

export default function App() {
  const { activeSelection, screens } = useProgramContext();

  return (
    <>
      <Header />
      {screens[activeSelection.programKey].component ??
        "Ошибка выбора программы, попробуйте позже"}
    </>
  );
}
