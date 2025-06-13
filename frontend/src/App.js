import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import Barbers from './components/Barbers';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Барбершоп
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Головна
            </Button>
            <Button color="inherit" component={Link} to="/barbers">
              Барбери
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Ласкаво просимо до нашого барбершопу
                </Typography>
                <Typography variant="body1" paragraph>
                  Оберіть розділ у меню для перегляду інформації
                </Typography>
              </div>
            } />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
