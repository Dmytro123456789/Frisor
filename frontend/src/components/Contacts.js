import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Paper,
    IconButton
} from '@mui/material';
import {
    LocationOn,
    Phone,
    Email,
    AccessTime,
    Facebook,
    Instagram,
    Twitter
} from '@mui/icons-material';

const Contacts = () => {
    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Наші Контакти
                </Typography>

                <Grid container spacing={4}>
                    {/* Контактна інформація */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                            <Typography variant="h5" gutterBottom>
                                Зв'яжіться з нами
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn color="primary" sx={{ mr: 2 }} />
                                    <Typography>
                                        вул. Шевченка, 10<br />
                                        м. Київ, 01001
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Phone color="primary" sx={{ mr: 2 }} />
                                    <Typography>
                                        +38 (044) 123-45-67<br />
                                        +38 (050) 987-65-43
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Email color="primary" sx={{ mr: 2 }} />
                                    <Typography>
                                        info@frisor.com<br />
                                        booking@frisor.com
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AccessTime color="primary" sx={{ mr: 2 }} />
                                    <Typography>
                                        Пн-Пт: 9:00 - 20:00<br />
                                        Сб-Нд: 10:00 - 18:00
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Ми в соціальних мережах
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <IconButton color="primary" aria-label="Facebook">
                                            <Facebook />
                                        </IconButton>
                                        <IconButton color="primary" aria-label="Instagram">
                                            <Instagram />
                                        </IconButton>
                                        <IconButton color="primary" aria-label="Twitter">
                                            <Twitter />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Карта */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.827853398542!2d30.519367315731!3d50.448385979475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce56b2456d3b%3A0xd062ae171b57e947!2z0YPQuy4g0JrQuNC10LIsINCa0LjRl9Cy!5e0!3m2!1sru!2sua!4v1647881234567!5m2!1sru!2sua"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Barbershop Location"
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Contacts; 