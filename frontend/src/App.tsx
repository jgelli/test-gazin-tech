import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListDeveloper from "./pages/Developer/List";
import CreateDeveloper from "./pages/Developer/Create";
import UpdateDeveloper from "./pages/Developer/Update";
import CreateLevel from "./pages/Level/Create";
import ListLevel from "./pages/Level/List";
import UpdateLevel from "./pages/Level/Update";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListDeveloper />} />
        <Route path="/desenvolvedor/criar" element={<CreateDeveloper />} />
        <Route
          path="/desenvolvedor/atualizar/:id"
          element={<UpdateDeveloper />}
        />
        <Route path="/nivel" element={<ListLevel />} />
        <Route path="/nivel/criar" element={<CreateLevel />} />
        <Route path="/nivel/atualizar/:id" element={<UpdateLevel />} />
      </Routes>
    </Router>
  );
};

export default App;
