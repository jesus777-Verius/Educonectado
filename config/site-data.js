/**
 * ========================================
 * DATOS CENTRALIZADOS DEL SITIO
 * ========================================
 * Contiene toda la información estática de EduConecta
 * Facilita el mantenimiento y reutilización de datos
 */

module.exports = {
    // ============================================
    // INFORMACIÓN DE LA EMPRESA
    // ============================================
    company: {
        name: 'EduConecta, C.A.',
        slogan: 'Transformando la educación digital en Venezuela',
        foundedYear: 2025,
        location: {
            city: 'San Juan de los Morros',
            state: 'Estado Guárico',
            country: 'Venezuela'
        },
        contact: {
            email: 'info@educonecta.edu.ve',
            supportEmail: 'soporte@educonecta.edu.ve',
            phone: '+58 414-123-4567',
            schedule: 'Lun - Sáb: 9:00 AM - 6:00 PM'
        },
        social: {
            facebook: '#',
            instagram: '#',
            twitter: '#',
            youtube: '#'
        }
    },

    // ============================================
    // EQUIPO FUNDADOR
    // ============================================
    founders: [
        { id: 1, name: 'Kevin Lizarzabal', role: 'CEO & Fundador', description: 'Lidera la visión estratégica de EduConecta.', image: '/images/OIP.webp' },
        { id: 2, name: 'José Torres', role: 'Director de Operaciones', description: 'Especialista en optimización de procesos.', image: '/images/OIP.webp' },
        { id: 3, name: 'Gustavo Colina', role: 'Director de Marketing', description: 'Lidera estrategias de crecimiento.', image: '/images/OIP.webp' },
        { id: 4, name: 'Gabriel Bolívar', role: 'Director de Tecnología', description: 'Experto en plataformas educativas.', image: '/images/OIP.webp' },
        { id: 5, name: 'Jesús Velázquez', role: 'Fundador', description: 'Especialista en diseño instruccional.', image: '/images/OIP.webp' },
        { id: 6, name: 'Carlos Nieves', role: 'Fundador', description: 'Experto en contenidos educativos.', image: '/images/OIP.webp' }
    ],

    // ============================================
    // ESTADÍSTICAS
    // ============================================
    stats: {
        students: '10,000+',
        courses: '150+',
        instructors: '50+',
        satisfaction: '95%'
    },

    // ============================================
    // CARACTERÍSTICAS PRINCIPALES
    // ============================================
    features: [
        { icon: 'my_location', title: 'Contenido Relevante', description: 'Cursos para el mercado venezolano.' },
        { icon: 'school', title: 'Instructores Expertos', description: 'Profesionales con experiencia real.' },
        { icon: 'phone', title: 'Acceso Móvil', description: 'Estudia desde cualquier dispositivo.' },
        { icon: 'verified', title: 'Certificación', description: 'Certificados verificables.' },
        { icon: 'support_agent', title: 'Soporte 24/7', description: 'Asistencia continua.' },
        { icon: 'trending_up', title: 'Actualización', description: 'Contenido actualizado.' }
    ],

    // ============================================
    // TESTIMONIOS
    // ============================================
    testimonials: [
        { name: 'Gabriel Bolívar', role: 'Estudiante de Marketing', image: '/images/OIP.webp', text: 'Excelente plataforma. Los cursos son muy prácticos.', rating: 5 },
        { name: 'José Torres', role: 'Estudiante de Programación', image: '/images/OIP.webp', text: 'Gracias a EduConecta pude cambiar de carrera.', rating: 5 },
        { name: 'Jesús Velázquez', role: 'Estudiante de Negocios', image: '/images/OIP.webp', text: 'La flexibilidad de horarios es increíble.', rating: 5 }
    ],

    // ============================================
    // MISIÓN Y VISIÓN
    // ============================================
    mission: 'Ofrecer soluciones de e-learning de alta calidad, accesibles y centradas en el estudiante.',
    vision: 'Ser la plataforma de e-learning más innovadora y confiable de Venezuela.',

    // ============================================
    // VALORES CORPORATIVOS
    // ============================================
    values: [
        { name: 'Innovación', description: 'Tecnologías modernas', icon: 'lightbulb' },
        { name: 'Calidad', description: 'Altos estándares', icon: 'verified' },
        { name: 'Inclusión', description: 'Recursos accesibles', icon: 'diversity_3' },
        { name: 'Responsabilidad', description: 'Democratización del conocimiento', icon: 'volunteer_activism' },
        { name: 'Excelencia', description: 'Plataformas seguras', icon: 'security' },
        { name: 'Colaboración', description: 'Trabajo conjunto', icon: 'handshake' }
    ]
};
