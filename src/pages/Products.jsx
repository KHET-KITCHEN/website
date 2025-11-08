import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, cartItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Cold Pressed Mustard Oil',
      description: 'Pure, organic, and unrefined mustard oil extracted using traditional methods',
      price: 450,
      category: 'Oils',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Organic Jaggery',
      description: 'Traditional, unprocessed jaggery made from pure sugarcane juice',
      price: 200,
      category: 'Sweeteners',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Cold Pressed Sesame Oil',
      description: 'Pure sesame oil, rich in nutrients and antioxidants',
      price: 500,
      category: 'Oils',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'Organic Honey',
      description: 'Pure, raw honey collected from our organic beehives',
      price: 350,
      category: 'Sweeteners',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      name: 'Cold Pressed Groundnut Oil',
      description: 'Pure groundnut oil extracted using traditional methods',
      price: 400,
      category: 'Oils',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 6,
      name: 'Organic Turmeric Powder',
      description: 'Pure turmeric powder made from organically grown turmeric',
      price: 250,
      category: 'Spices',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const getQuantityInCart = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Discover our range of pure, organic products made with traditional methods
          to preserve their natural goodness and nutritional value.
        </Typography>

        {/* Search Bar and Cart Button */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <Badge badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={() => navigate('/checkout')}
            sx={{ minWidth: 150 }}
          >
            View Cart
          </Button>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Chip
                      label={product.category}
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{product.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    {getQuantityInCart(product.id) === 0 ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => addToCart(product)}
                        startIcon={<AddIcon />}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => updateQuantity(product.id, getQuantityInCart(product.id) - 1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                          {getQuantityInCart(product.id)}
                        </Typography>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => updateQuantity(product.id, getQuantityInCart(product.id) + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products; 