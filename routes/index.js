/**
 * ========================================
 * RUTAS PRINCIPALES - EDUCONECTA
 * ========================================
 * Define todas las rutas públicas del sitio
 */

const express = require('express');
const router = express.Router();
const siteData = require('../config/site-data');

// ============================================
// BASE DE DATOS DE CURSOS (Simulada)
// ============================================
// En producción, esto vendría de una base de datos real
const courses = [
    {
        id: 'ingles-a1-basico',
        title: 'English Starter: Fundamentos (A1)',
        category: 'Inglés Básico',
        level: 'Principiante',
        description: 'Aprende las primeras 1000 palabras y estructuras simples.',
        rating: 4.8, reviews: 234, hours: 8, lessons: 12,
        price: 29.99, originalPrice: 59.99, discount: 50,
        image: '/images/OIP.webp',
        badge: 'POPULAR', badgeColor: '#28a745'
    },
    {
        id: 'ingles-b2-conversacion',
        title: 'Inmersión B2: Conversaciones Fluidas',
        category: 'Fluidez Oral',
        level: 'Intermedio',
        description: 'Mejora tu pronunciación y amplía tus modismos.',
        rating: 4.9, reviews: 189, hours: 20, lessons: 24,
        price: 49.99, originalPrice: 89.99, discount: 44,
        image: '/images/imagen 1.png',
        badge: 'HOT', badgeColor: '#ffc107'
    },
    {
        id: 'ingles-c1-gramatica',
        title: 'Gramática C1/C2: Perfeccionamiento',
        category: 'Gramática',
        level: 'Avanzado',
        description: 'Domina tiempos verbales avanzados y estructuras complejas.',
        rating: 4.6, reviews: 98, hours: 12, lessons: 16,
        price: 34.99, originalPrice: 59.99, discount: 42,
        image: '/images/imagen 2.png',
        badge: 'NEW', badgeColor: '#dc3545'
    },
    {
        id: 'preparacion-ielts-toefl',
        title: 'Preparación IELTS/TOEFL',
        category: 'Certificación',
        level: 'Intermedio',
        description: 'Estrategias para exámenes internacionales.',
        rating: 4.8, reviews: 267, hours: 25, lessons: 30,
        price: 44.99, originalPrice: 79.99, discount: 44,
        image: '/images/imagen 3.png',
        badge: null, badgeColor: null
    },
    {
        id: 'ingles-negocios',
        title: 'Business English',
        category: 'Inglés Profesional',
        level: 'Intermedio',
        description: 'Reuniones, emails y negociación en inglés.',
        rating: 4.7, reviews: 156, hours: 15, lessons: 18,
        price: 39.99, originalPrice: 69.99, discount: 43,
        image: '/images/imagen 4.png',
        badge: null, badgeColor: null
    },
    {
        id: 'ingles-viajes-gratis',
        title: 'Inglés para Viajeros (A2)',
        category: 'Inglés Turístico',
        level: 'Principiante',
        description: 'Frases clave para aeropuertos, hoteles y restaurantes.',
        rating: 4.9, reviews: 312, hours: 16, lessons: 20,
        price: 0, originalPrice: 49.99, discount: 100,
        image: '/images/imagen 5.png',
        badge: 'FREE', badgeColor: '#28a745'
    },
    {
        id: 'lectura-ingles-b1',
        title: 'Reading Master (B1)',
        category: 'Lectura',
        level: 'Intermedio',
        description: 'Mejora tu velocidad y comprensión lectora.',
        rating: 4.7, reviews: 145, hours: 10, lessons: 14,
        price: 24.99, originalPrice: 44.99, discount: 44,
        image: '/images/imagen 6.png',
        badge: 'TRENDING', badgeColor: '#ff6b6b'
    },
    {
        id: 'ingles-para-ninos',
        title: 'Inglés para Niños (5-12 años)',
        category: 'Inglés Infantil',
        level: 'Principiante',
        description: 'Aprende jugando con actividades interactivas.',
        rating: 4.9, reviews: 287, hours: 12, lessons: 20,
        price: 34.99, originalPrice: 67.99, discount: 49,
        image: '/images/imagen 7.png',
        badge: 'KIDS', badgeColor: '#ff6b6b'
    },
    {
        id: 'marketing-digital',
        title: 'Marketing Digital Completo',
        category: 'Marketing',
        level: 'Intermedio',
        description: 'SEO, redes sociales y publicidad pagada.',
        rating: 4.8, reviews: 234, hours: 20, lessons: 24,
        price: 29.99, originalPrice: 59.99, discount: 50,
        image: '/images/imagen 1.png',
        badge: 'POPULAR', badgeColor: '#28a745'
    },
    {
        id: 'programacion-web',
        title: 'Programación Web Moderna',
        category: 'Programación',
        level: 'Principiante',
        description: 'HTML, CSS, JavaScript y frameworks.',
        rating: 4.9, reviews: 456, hours: 40, lessons: 50,
        price: 49.99, originalPrice: 99.99, discount: 50,
        image: '/images/OIP.webp',
        badge: 'BESTSELLER', badgeColor: '#667eea'
    },
    {
        id: 'gestion-negocios',
        title: 'Gestión de Negocios',
        category: 'Negocios',
        level: 'Intermedio',
        description: 'Administración, finanzas y liderazgo.',
        rating: 4.7, reviews: 178, hours: 18, lessons: 22,
        price: 39.99, originalPrice: 79.99, discount: 50,
        image: '/images/imagen 2.png',
        badge: null, badgeColor: null
    }
];

// ============================================
// FUNCIÓN AUXILIAR
// ============================================
// Busca un curso por su ID
const getCourseById = (id) => courses.find(c => c.id === id);

// ============================================
// RUTAS PÚBLICAS
// ============================================

// Página principal
router.get('/', (req, res) => {
    res.render('clientes/landing', { 
        courses: courses.slice(0, 3), // Solo 3 cursos destacados
        siteData
    });
});

// Catálogo de cursos
router.get('/catalogo', (req, res) => {
    res.render('clientes/catalogo', { courses });
});

// Planes y precios
router.get('/precios', (req, res) => {
    res.render('clientes/precios');
});

// Blog educativo
router.get('/blog', (req, res) => {
    res.render('clientes/blog');
});

// Quiénes somos
router.get('/quienes-somos', (req, res) => {
    res.render('clientes/quienes-somos');
});

// Contacto
router.get('/contacto', (req, res) => {
    res.render('clientes/contacto');
});

// ============================================
// DETALLE DE CURSO
// ============================================
router.get('/curso/:id', (req, res) => {
    let course = getCourseById(req.params.id);
    
    // Fallback: buscar por índice numérico
    if (!course) {
        const idx = parseInt(req.params.id) - 1;
        if (idx >= 0 && idx < courses.length) {
            course = courses[idx];
        }
    }
    
    // Si no existe, usar el primero
    if (!course) course = courses[0];
    
    // Cursos relacionados (excluyendo el actual)
    const relatedCourses = courses.filter(c => c.id !== course.id).slice(0, 3);
    
    res.render('clientes/detalle-curso', { course, relatedCourses });
});

module.exports = router;
