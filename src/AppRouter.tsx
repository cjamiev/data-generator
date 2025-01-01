import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { PasswordGeneratorPage } from './pages/PasswordGeneratorPage';
import { ParagraphGeneratorPage } from './pages/ParagraphGeneratorPage';
import { EncodePage } from './pages/EncodePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="data-generator" element={<GeneratorPage />} />
          <Route path="password-generator" element={<PasswordGeneratorPage />} />
          <Route path="paragraph-generator" element={<ParagraphGeneratorPage />} />
          <Route path="encode" element={<EncodePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
