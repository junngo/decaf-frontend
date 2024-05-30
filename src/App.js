import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import AuthInitializer from './components/common/AuthInitializer';
import Layout from './components/common/Layout';
import ProtectedRoute  from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignUp  from './pages/SignUp';
import SignIn  from './pages/SignIn';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

const theme = createTheme({
  palette: {
    background: {
      default: '#fff',  // Sets the default background color to white
      paper: '#fff',    // Sets background color for components like Card and Paper to white
    },
    primary: {
      main: '#1976d2',  // Example primary color
    },
    secondary: {
      main: '#dc004e',  // Example secondary color
    },
    text: {
      primary: '#333',  // Darker text for better readability on a white background
      secondary: '#555', // Lighter text color, adjust as needed
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    button: {
      textTransform: 'none' // Optional: prevents uppercase transformation in buttons
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AuthInitializer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                  <ProtectedRoute>
                      <SettingsPage />
                  </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
