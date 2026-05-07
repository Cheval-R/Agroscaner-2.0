import './styles';

import { Route, Routes } from 'react-router-dom';

import CornSilageHarvestCalculator from '../pages/Corn/CornSilageHarvestCalculator';
import MineralFertilizerCalculator from '../pages/Minerals/MineralFertilizerCalculator';
import NitrogenFeedingCalculator from '../pages/Nitrogen/NitrogenFeedingCalculator';
import Layout from './layouts/Layout/Layout';

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
