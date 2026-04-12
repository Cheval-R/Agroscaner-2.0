import { Route, Routes } from "react-router-dom";
import "./styles";
import Layout from "./layouts/Layout/Layout";
import MineralFertilizerCalculator from "../pages/Minerals/MineralFertilizerCalculator";
import CornSilageHarvestCalculator from "../pages/Corn/CornSilageHarvestCalculator";
import NitrogenFeedingCalculator from "../pages/Nitrogen/NitrogenFeedingCalculator";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type React from "react";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          path="mineral-fertilizer-calculator"
          element={<MineralFertilizerCalculator />}
        >
          <Route
            path=":clientKey"
            element={<MineralFertilizerCalculator />}
          />
        </Route>
        <Route
          path="corn-silage-harvest-calculator"
          element={<CornSilageHarvestCalculator />}
        />
        <Route
          path="nitrogen-feeding-calculator"
          element={<NitrogenFeedingCalculator />}
        />
      </Route>
    </Routes>
  );
}
