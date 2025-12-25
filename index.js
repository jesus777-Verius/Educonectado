/**
 * ========================================
 * SERVIDOR PRINCIPAL - EDUCONECTA
 * ========================================
 * Archivo de entrada de la aplicación Express
 * Configura middlewares, rutas y manejo de errores
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// ============================================
// CONFIGURACIÓN DEL MOTOR DE VISTAS
// ============================================
// Usamos EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================
// MIDDLEWARES
// ============================================
// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================
// RUTAS
// ============================================
// Importar y usar las rutas principales
const routes = require('./routes');
app.use('/', routes);

// ============================================
// MANEJO DE ERRORES 404
// ============================================
// Captura cualquier ruta no definida
app.use((req, res) => {
    res.status(404).render('special/error-404');
});

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor EduConecta corriendo en http://localhost:${PORT}`);
});
