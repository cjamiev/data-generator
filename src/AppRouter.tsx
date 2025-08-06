import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { DataGeneratorPage } from './pages/DataGeneratorPage';
import { PasswordGeneratorPage } from './pages/PasswordGeneratorPage';
import { ParagraphGeneratorPage } from './pages/ParagraphGeneratorPage';
import { RandomContentPage } from './pages/RandomContentPage';
import { EncodePage } from './pages/EncodePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="data-generator" element={<DataGeneratorPage />} />
          <Route path="password-generator" element={<PasswordGeneratorPage />} />
          <Route path="paragraph-generator" element={<ParagraphGeneratorPage />} />
          <Route path="encode" element={<EncodePage />} />
          <Route path="random-content" element={<RandomContentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
