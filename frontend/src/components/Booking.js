import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Box,
    Paper
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { uk } from 'date-fns/locale';

const Booking = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        service: '',
        barber: '',
        date: null,
        time: null
    });
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Завантаження послуг
        fetch('http://localhost:5000/api/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error('Error loading services:', err));

        // Завантаження барберів
        fetch('http://localhost:5000/api/barbers')
            .then(res => res.json())
            .then(data => setBarbers(data))
            .catch(err => console.error('Error loading barbers:', err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_name: formData.clientName,
                    service_id: formData.service,
                    barber_id: formData.barber,
                    booking_date: formData.date.toISOString().split('T')[0],
                    booking_time: formData.time.toTimeString().split(' ')[0]
                }),
            });

            if (response.ok) {
                setMessage('Запис успішно створено!');
                setFormData({
                    clientName: '',
                    service: '',
                    barber: '',
                    date: null,
                    time: null
                });
            } else {
                setMessage('Помилка при створенні запису');
            }
        } catch (error) {
            setMessage('Помилка при створенні запису');
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Запис до барбера
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Ваше ім'я"
                            value={formData.clientName}
                            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                            margin="normal"
                            required
                        />

                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Послуга</InputLabel>
                            <Select
                                value={formData.service}
                                onChange={(e) => setFormData({...formData, service: e.target.value})}
                            >
                                {services.map((service) => (
                                    <MenuItem key={service.id} value={service.id}>
                                        {service.name} - {service.price} грн
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Барбер</InputLabel>
                            <Select
                                value={formData.barber}
                                onChange={(e) => setFormData({...formData, barber: e.target.value})}
                            >
                                {barbers.map((barber) => (
                                    <MenuItem key={barber.id} value={barber.id}>
                                        {barber.name} - {barber.position}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <DatePicker
                                    label="Дата"
                                    value={formData.date}
                                    onChange={(newValue) => setFormData({...formData, date: newValue})}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </Box>

                            <Box sx={{ mt: 2, mb: 2 }}>
                                <TimePicker
                                    label="Час"
                                    value={formData.time}
                                    onChange={(newValue) => setFormData({...formData, time: newValue})}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </Box>
                        </LocalizationProvider>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ mt: 2 }}
                        >
                            Записатися
                        </Button>
                    </form>

                    {message && (
                        <Typography
                            variant="body1"
                            color={message.includes('успішно') ? 'success.main' : 'error.main'}
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            {message}
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default Booking; 