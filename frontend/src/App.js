import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./pages/navigation/Navigation";
import Home from "./pages/home/Home";
import Authentication from "./pages/authentication/authentication";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
