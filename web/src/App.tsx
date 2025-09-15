import { Layout } from "@/components/Layout";
import { Translate } from "@/pages/Translate";
import { BrowserRouter, Route, Routes } from "react-router";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<Translate />} />
          <Route path="/translate" element={<Translate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

