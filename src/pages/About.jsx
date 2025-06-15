import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        {/* Company Story */}
        <motion.div {...fadeIn}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto', mb: 6, textIndent: '2em', textAlign: 'justify' }}>
          In today’s world, organic and natural products are often sold at a premium—making them inaccessible to the average person. At our core, we believe that good health should never be a luxury. Our mission is to make pure, chemical-free, and traditionally made organic products affordable for everyone, without compromising on quality.
          India has always been known for its rich heritage of wholesome, unadulterated food. From the oils we used to cook with to the jaggery that sweetened our meals, our diets were once filled with purity and natural goodness. But over time, as industrial processes took over to meet rising demand, chemicals and artificial additives became the norm.

We aim to change that.

By minimizing profit margins and focusing on sustainable, traditional methods of production, we bring you products that are truly natural—free from harmful chemicals and excessive processing. Our goal is simple: to help every Indian household return to a healthier, more authentic way of living.

Together, let’s make India healthier—one pure product at a time.

          </Typography>
        </motion.div>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <motion.div {...fadeIn}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h4" component="h2" gutterBottom color="primary">
                  Our Mission
                </Typography>
                <Typography variant="body1">
                  To provide consumers with the purest, most natural organic products while promoting
                  sustainable farming practices and supporting local farmers. We are committed to
                  maintaining the highest standards of quality and authenticity in everything we do.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div {...fadeIn}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h4" component="h2" gutterBottom color="primary">
                  Our Vision
                </Typography>
                <Typography variant="body1">
                To become the most trusted & economical  name in organic & natural products, known for our commitment to quality, sustainability, and traditional processing methods. We aim to create a healthier future by connecting consumers with nature's purest offerings.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Values */}
        <motion.div {...fadeIn}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Our Values
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Purity',
                description: 'We ensure that our products are 100% pure and free from any artificial additives or preservatives.'
              },
              {
                title: 'Sustainability',
                description: 'We practice and promote sustainable farming methods that respect and preserve our environment.'
              },
              {
                title: 'Tradition',
                description: 'We honor traditional processing methods that have been proven to maintain the natural goodness of our products.'
              },
              {
                title: 'Quality',
                description: 'We maintain the highest standards of quality in every step of our process, from farm to kitchen.'
              },
              {
                title: 'Honesty',
                description: "We believe honesty is the foundation of trust. From sourcing to packaging, we are transparent about our ingredients, processes, and practices. What you see is truly what you get - pure, authentic food with no hidden chemicals or false claims. We commit to always doing what's right for our customers and their health."
              }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" component="h3" gutterBottom color="primary">
                    {value.title}
                  </Typography>
                  <Typography variant="body2">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 