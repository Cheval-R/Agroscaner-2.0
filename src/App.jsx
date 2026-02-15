import Header from "./components/Header/Header";
import { useProgramContext } from "./components/Context/AppContext";
import CornSilageHarvestCalculator from "./pages/Corn/CornSilageHarvestCalculator";
import MineralFertilizerCalculator from "./pages/Minerals/MineralFertilizerCalculator";
import NitrogenFeedingCalculator from "./pages/Nitrogen/NitrogenFeedingCalculator";

export default function App() {
  const screens = {
    "nitrogen-feeding-calculator": <NitrogenFeedingCalculator />,
    "mineral-fertilizer-calculator": <MineralFertilizerCalculator />,
    "corn-silage-harvest-calculator": <CornSilageHarvestCalculator />,
  };

  const { activeSelection } = useProgramContext();

  return (
    <>
      <Header />
      {screens[activeSelection.program.key] ??
        "Ошибка выбора программы, попробуйте позже"}
    </>
  );
}
