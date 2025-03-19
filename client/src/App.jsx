import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import {
  Home,
  Contact,
  Market,
  DiseaseInput,
  DiseaseOutput,
  CropInput,
  CropOutput,
  YieldInput,
  YieldOutput,
} from "./Components/index.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="market" element={<Market />} />
          <Route path="disease">
            <Route path="predict" element={<DiseaseInput />} />
            <Route path="result" element={<DiseaseOutput />} />
          </Route>
          <Route path="crop">
            <Route path="predict" element={<CropInput />} />
            <Route path="result" element={<CropOutput />} />
          </Route>
          <Route path="yield">
            <Route path="predict" element={<YieldInput />} />
            <Route path="result" element={<YieldOutput />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
