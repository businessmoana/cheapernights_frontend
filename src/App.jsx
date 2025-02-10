import "./App.css";
import React from 'react'; // Import React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleLens from "./pages/googleLens";
import Google from "./pages/google";
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
                <Google />
              </Layout>
            }
          />
          <Route
            path="/google"
            element={
              <Layout>
                <Google />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
