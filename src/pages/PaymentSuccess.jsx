import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, paymentId, trackingId, amount } = location.state || {};

  useEffect(() => {
    if (!orderId || !paymentId) {
      navigate('/products');
    }
  }, [orderId, paymentId, navigate]);

  if (!orderId || !paymentId) {
    return null;
  }

  return (
    <Box sx={{ py: 8, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 100,
                    color: 'success.main',
                    mb: 3,
                  }}
                />
              </motion.div>

              <Typography variant="h3" component="h1" gutterBottom color="success.main">
                Payment Successful!
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Thank you for your order. We have received your payment.
              </Typography>

              <Alert severity="success" sx={{ mb: 4, textAlign: 'left' }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Confirmation Email Sent!</strong>
                </Typography>
                <Typography variant="body2">
                  We have sent a confirmation email to your registered email address. 
                  You will receive a follow-up email with tracking ID and tracking URL shortly.
                </Typography>
              </Alert>

              <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: 'left', bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Order ID:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {orderId}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment ID:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {paymentId}
                    </Typography>
                  </Box>
                  {trackingId && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Tracking ID:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {trackingId}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Amount Paid:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      ₹{amount}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/')}
                >
                  Go to Home
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingBagIcon />}
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                If you have any questions, please feel free to contact us.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;

