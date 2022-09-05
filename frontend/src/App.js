import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './routes/navigation/Navigation';
import Home from './routes/home/Home';
import Authentication from './routes/authentication/authentication';
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          {/* Protected route? If user logged in - return Home */}
          <Route index element={user ? <Home /> : <Navigate to="/auth" />} />
          {/* <Route path="/landing" element={<Landing />} /> */}
          <Route
            path="/auth"
            element={!user ? <Authentication /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
