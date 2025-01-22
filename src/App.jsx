import "./App.css";
import React from 'react'; // Import React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
