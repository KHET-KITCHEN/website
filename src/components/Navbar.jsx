import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import mascot from '/images/mascot.png';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Products', path: '/products' },
    { text: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <ListItem
        button
        onClick={() => {
          navigate('/checkout');
          handleDrawerToggle();
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon />
              Cart
              <Badge badgeContent={getTotalItems()} color="secondary" sx={{ ml: 1 }} />
            </Box>
          }
        />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <img src={mascot} alt="Khet2Kitchen Mascot" style={{ height: 40, marginRight: 12, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
          Khet2Kitchen Organics
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                color="inherit"
              >
                {item.text}
              </Button>
            ))}
            <IconButton
              color="inherit"
              onClick={() => navigate('/checkout')}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={getTotalItems()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 