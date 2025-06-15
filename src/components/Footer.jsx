import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import mascot from '/images/mascot.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <img src={mascot} alt="Khet2Kitchen Mascot" style={{ height: 36, marginRight: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
              <Typography variant="h6" gutterBottom>
                Khet2Kitchen Organics
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Bringing pure, organic products from farm to your kitchen.
              We believe in sustainable farming and traditional processing methods.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/products" color="inherit" display="block" sx={{ mb: 1 }}>
              Products
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Organic Street
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Farm District, State - 123456
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +91 123 456 7890
            </Typography>
            <Typography variant="body2">
              Email: info@khet2kitchen.com
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 5, borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', pt: 3 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Khet2Kitchen Organics. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 