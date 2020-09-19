import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'theme-ui';
import { theme, Skeleton } from '@tabetalt/kit'

// Modules
const Account = lazy(() => import('./modules/account/Account'));
const Catalog = lazy(() => import('./modules/catalog/Catalog'));
const Dashboard = lazy(() => import('./modules/dashboard/Dashboard'));
const Orders = lazy(() => import('./modules/order/Orders'));
const Pages = lazy(() => import('./modules/page/Pages'));
const Settings = lazy(() => import('./modules/settings/Settings'));

const renderLoader = () => <Skeleton />;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="account" element={<Account />} />
          <Route path="catalog/*" element={<Catalog />} />
          <Route path="order" element={<Orders />} />
          <Route path="page" element={<Pages />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
