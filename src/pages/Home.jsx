import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { motion } from 'framer-motion';
import mascot from '/images/mascot.png';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Cold Pressed Mustard Oil',
      description: 'Pure, organic, and unrefined mustard oil',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Organic Jaggery',
      description: 'Traditional, unprocessed jaggery',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Cold Pressed Sesame Oil',
      description: 'Pure sesame oil, rich in nutrients',
      image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: 'auto', md: '80vh' },
          minHeight: { xs: '60vh', md: 'unset' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          background: '#e6f5d0',
        }}
      >
        {/* Left: Text and Button */}
        <Box sx={{ flex: { xs: 'unset', md: '0 0 48%' }, width: { xs: '100%', md: '48%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', pl: { xs: 2, sm: 6, md: 10 }, pr: { xs: 2, sm: 2 }, py: { xs: 6, md: 0 }, bgcolor: '#e6f5d0', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#2E7D32', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.15)', textAlign: 'left', width: '100%', ml: 0, fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' } }}>
              Pure Organic Products
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#4E342E', textShadow: '0 2px 8px rgba(255,255,255,0.2)', textAlign: 'left', width: '100%', ml: 0, fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
              From Farm to Your Kitchen
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2, alignSelf: 'flex-start', ml: 0 }}
            >
              Explore Products
            </Button>
          </motion.div>
        </Box>
        {/* Right: Farm Image */}
        <Box sx={{ flex: { xs: 'unset', md: '0 0 52%' }, width: { xs: '100%', md: '52%' }, height: { xs: 220, sm: 320, md: '100%' }, display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end', position: 'relative', minWidth: 0 }}>
          <Box sx={{ width: '100%', height: '100%', background: 'url(/images/farm-bg.png) right center/cover no-repeat', minWidth: 0 }} />
        </Box>
      </Box>

      {/* Mission Statement */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
          At Khet2Kitchen Organics, we are committed to bringing you the purest, most natural organic products
          directly from our farms to your kitchen. We believe in sustainable farming practices and
          traditional processing methods that preserve the natural goodness of our products.
        </Typography>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h3">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 