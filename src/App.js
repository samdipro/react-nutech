import "./App.css";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        [
        <Route
          path="/"
          element={
            // <ProtectedPage guesOnly={false} needLogin={true}>
            <HomePage />
            // </ProtectedPage>
          }
        />
        , ]
        <Route
          path="/product"
          element={
            // <ProtectedPage guesOnly={false} needLogin={true}>
            <ProductPage />
            // </ProtectedPage>
          }
        />
        , ]
      </Routes>
    </>
  );
}

export default App;
