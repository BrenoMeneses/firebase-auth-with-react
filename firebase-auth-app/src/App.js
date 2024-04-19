import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Login } from "./components/login"
import ListaDeTarefas from "./components/ListaDeTarefas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" />} />
        <Route path="/cadastro" element={<Login />} />
        <Route path="/lista-tarefas" element={<ListaDeTarefas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
