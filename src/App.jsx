import { useState } from "react";
import Header from "./components/Blocks/Header/Header";

export default function App() {
  const [activeProgramKeys, setActiveProgramKeys] = useState({
    programKey: "nitrogen",
    clientKey: "planin",
  });
  const programList = [
    {
      label: "Расчёт минеральных удобрений",
      key: "mineral",

      innerList: [
        {
          key: "pecherskoeStavropol",
          label: "Печерское (Ставропольский район)",
        },
        {
          key: "pecherskoeSyzran",
          label: "Печерское (Сызранский район)",
        },
        { key: "planin", label: "КФХ Планин" },
        { key: "nur", label: "ООО АФ НУР" },
        { key: "duslyk", label: "ООО АФ Дуслык" },
        { key: "anyak", label: "ООО АФ Аняк" },
        { key: "tuganYak", label: "ООО АФ Родные края - Туган Як" },
        { key: "staromainskaya", label: "АО АФ Старомайнская" },
        { key: "abdullin", label: "КФХ Абдуллин" },
      ],
    },
    { label: "Расчёт сроков уборки кукурузы", key: "corn" },
    { label: "Расчёт азотной подкормки", key: "nitrogen" },
  ];
  const activeProgram = programList.find((program) => {
    return program.key === activeProgramKeys.programKey;
  });

  const activeClient = activeProgram?.innerList?.find((program) => {
    return program.key === activeProgramKeys.clientKey;
  });

  const changeActiveProgram = (activeProgram) => {
    console.log("changeActiveProgram");

    setActiveProgramKeys({
      clientKey: null,
      programKey: activeProgram,
    });
  };

  const changeActiveClient = (activeClient) => {
    setActiveProgramKeys((prev) => ({
      programKey: "mineral",
      clientKey: activeClient,
    }));
  };

  return (
    <>
      <Header
        programList={programList}
        activeProgram={activeProgramKeys}
        changeActiveProgram={changeActiveProgram}
        changeActiveClient={changeActiveClient}
      />
      {activeClient ? activeClient.label : activeProgram.label}
    </>
  );
}
