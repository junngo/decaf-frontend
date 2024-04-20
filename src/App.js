import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles/main.scss';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CategoriesPage from './pages/CategoriesPage';


function App() {
  return (
    <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/categories" element={<CategoriesPage />} />
            </Route>
          </Routes>
        </Layout>
    </Router>
  );
}

export default App;
