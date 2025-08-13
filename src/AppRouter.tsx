import { Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { DataGeneratorPage } from './pages/DataGeneratorPage';
import { PasswordGeneratorPage } from './pages/PasswordGeneratorPage';
import { SettingsPage } from './pages/SettingsPage';

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="data-generator" element={<DataGeneratorPage />} />
          <Route path="password-generator" element={<PasswordGeneratorPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
