import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/Navigation';
import Home from './routes/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          {/* Protected route? If user logged in - return Home */}
          <Route index element={<Home />} />
          {/* <Route path="/landing" element={<Landing />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
