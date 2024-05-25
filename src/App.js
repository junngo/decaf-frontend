import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import AuthInitializer from './components/common/AuthInitializer';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import SignUp  from './pages/SignUp';
import SignIn  from './pages/SignIn';

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
  // You can also adjust the typography to suit a minimalistic design
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
          <Layout>
            <AuthInitializer />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
