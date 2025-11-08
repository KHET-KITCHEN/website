import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.state || !customerInfo.pincode) {
      setError('Please fill in all fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^[0-9]{10}$/.test(customerInfo.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setError('Failed to load Razorpay. Please try again.');
        setLoading(false);
        return;
      }

      // Create order on backend
      const response = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          currency: 'INR',
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
            city: customerInfo.city,
            state: customerInfo.state,
            pincode: customerInfo.pincode,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await response.json();

      // Initialize Razorpay payment
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Khet2Kitchen Organics',
        description: 'Order Payment',
        order_id: orderData.orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: {
          color: '#2E7D32',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch(`${API_BASE_URL}/api/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || 'Payment verification failed');
            }

            const verifyData = await verifyResponse.json();
            
            // Clear cart and navigate to success page
            clearCart();
            navigate('/payment-success', {
              state: {
                orderId: verifyData.orderId,
                paymentId: response.razorpay_payment_id,
                trackingId: verifyData.trackingId,
                amount: getTotalPrice(),
              },
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            // Navigate to failure page
            navigate('/payment-failure', {
              state: {
                error: error.message || 'Payment verification failed. Please contact support.',
                orderId: orderData.orderId,
                amount: getTotalPrice(),
              },
            });
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      
      // Handle payment failure
      razorpay.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        navigate('/payment-failure', {
          state: {
            error: response.error.description || response.error.reason || 'Payment failed. Please try again.',
            orderId: orderData.orderId,
            amount: getTotalPrice(),
          },
        });
        setLoading(false);
      });
      
      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Failed to process payment. Please try again.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 8, minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Checkout
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {item.name}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="body2">{item.quantity}</Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">₹{item.price}</TableCell>
                          <TableCell align="right">₹{item.price * item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{getTotalPrice()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Information */}
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={3}
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={customerInfo.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handlePayment}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Processing...' : `Pay ₹${getTotalPrice()}`}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;

