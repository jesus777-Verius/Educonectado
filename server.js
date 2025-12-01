const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal - Landing Page
app.get('/', (req, res) => {
    res.render('public/landing');
});

// Rutas públicas
app.get('/catalogo', (req, res) => {
    res.render('public/catalogo');
});

app.get('/precios', (req, res) => {
    res.render('public/precios');
});

app.get('/blog', (req, res) => {
    res.render('public/blog');
});

app.get('/quienes-somos', (req, res) => {
    res.render('public/quienes-somos');
});

app.get('/contacto', (req, res) => {
    res.render('public/contacto');
});

// Rutas de cursos
app.get('/curso/:id', (req, res) => {
    res.render('public/detalle-curso');
});

// Rutas de autenticación
app.get('/login', (req, res) => {
    res.render('public/auth');
});

app.get('/register', (req, res) => {
    res.render('public/auth');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
