import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green shade for organic theme
    },
    secondary: {
      main: '#FFA000', // Amber shade for warmth
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-failure" element={<PaymentFailure />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
