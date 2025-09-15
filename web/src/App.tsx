import { Layout } from '@/components/Layout';
import { Translate } from '@/pages/Translate';
import { TranslateCreate } from '@/pages/Translate/Create';
import { BrowserRouter, Route, Routes } from 'react-router';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Translate />} />
          <Route path="/translate" element={<Translate />} />
          <Route path="/translate/create" element={<TranslateCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
