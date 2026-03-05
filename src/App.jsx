import Header from "./components/Header/Header";
import { useProgramContext } from "./components/Context/AppContext";
import CornSilageHarvestCalculator from "./pages/Corn/CornSilageHarvestCalculator";
import MineralFertilizerCalculator from "./pages/Minerals/MineralFertilizerCalculator";
import NitrogenFeedingCalculator from "./pages/Nitrogen/NitrogenFeedingCalculator";

export default function App() {
  const screens = {
    "mineral-fertilizer-calculator": <MineralFertilizerCalculator />,
    "corn-silage-harvest-calculator": <CornSilageHarvestCalculator />,
    "nitrogen-feeding-calculator": <NitrogenFeedingCalculator />,
  };

  const { activeSelection } = useProgramContext();

  return (
    <>
      <Header />
      {
        screens[activeSelection.programKey] ?? <MineralFertilizerCalculator />
        // "Ошибка выбора программы, попробуйте позже"
      }
    </>
  );
}
