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
import ErrorIcon from '@mui/icons-material/Error';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, orderId, amount } = location.state || {};

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
                <ErrorIcon
                  sx={{
                    fontSize: 100,
                    color: 'error.main',
                    mb: 3,
                  }}
                />
              </motion.div>

              <Typography variant="h3" component="h1" gutterBottom color="error.main">
                Payment Failed
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                We're sorry, but your payment could not be processed.
              </Typography>

              <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
                <Typography variant="body1" gutterBottom>
                  <strong>What happened?</strong>
                </Typography>
                <Typography variant="body2">
                  {error || 'Your payment was not successful. This could be due to various reasons such as insufficient funds, card declined, or network issues.'}
                </Typography>
              </Alert>

              {orderId && (
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
                    {amount && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Amount:
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          ₹{amount}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>
              )}

              <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
                <Typography variant="body2">
                  <strong>What can you do?</strong>
                </Typography>
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>Check your payment method and try again</li>
                    <li>Ensure you have sufficient funds</li>
                    <li>Verify your card details are correct</li>
                    <li>Contact your bank if the issue persists</li>
                    <li>Try using a different payment method</li>
                  </ul>
                </Typography>
              </Alert>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<RefreshIcon />}
                  onClick={() => navigate('/checkout')}
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
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
                If you continue to experience issues, please contact our support team.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PaymentFailure;

