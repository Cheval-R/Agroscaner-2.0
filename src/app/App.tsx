import Header from "./layouts/Header/Header";
import { useProgramContext } from "./providers/AppContext";
import "./styles";

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
