import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Esewa from "./pages/Esewa";
import PaymentStatus from "./pages/PaymentStatus";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Esewa />} />
        <Route path="/success" element={<PaymentStatus />} />
        <Route path="/failure" element={<PaymentStatus />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const Example = () => {
  return <>Example</>;
};
