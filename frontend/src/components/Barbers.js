import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/barbers');
        setBarbers(response.data);
      } catch (error) {
        console.error('Error fetching barbers:', error);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Наші Барбери
      </Typography>
      <Grid container spacing={4}>
        {barbers.map((barber) => (
          <Grid item key={barber.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={`https://source.unsplash.com/random/300x300?barber,${barber.id}`}
                alt={barber.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {barber.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {barber.position}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Досвід: {barber.experience} років
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {barber.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {barber.instagram && (
                    <Typography variant="body2" component="a" href={barber.instagram} target="_blank" rel="noopener noreferrer" sx={{ mr: 2 }}>
                      Instagram
                    </Typography>
                  )}
                  {barber.facebook && (
                    <Typography variant="body2" component="a" href={barber.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Barbers; 