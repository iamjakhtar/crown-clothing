import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";


const Shop = () => <h1>Shop component</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
