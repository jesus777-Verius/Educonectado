const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

async function createDefaultUsers() {
    try {
        // Usuarios por defecto
        const defaultUsers = [
            {
                nombres: 'Juan',
                apellidos: 'Estudiante',
                email: 'estudiante@educonecta.com',
                telefono: '+58 414-111-1111',
                password: '12345678',
                tipo_usuario: 'estudiante'
            },
            {
                nombres: 'María',
                apellidos: 'Docente',
                email: 'docente@educonecta.com',
                telefono: '+58 414-222-2222',
                password: '12345678',
                tipo_usuario: 'docente'
            },
            {
                nombres: 'Carlos',
                apellidos: 'Admin',
                email: 'admin@educonecta.com',
                telefono: '+58 414-333-3333',
                password: '12345678',
                tipo_usuario: 'admin'
            },
            {
                nombres: 'Institución',
                apellidos: 'Educativa',
                email: 'institucion@educonecta.com',
                telefono: '+58 414-444-4444',
                password: '12345678',
                tipo_usuario: 'institucion'
            },
            {
                nombres: 'Empresa',
                apellidos: 'Corporativa',
                email: 'empresa@educonecta.com',
                telefono: '+58 414-555-5555',
                password: '12345678',
                tipo_usuario: 'empresa'
            }
        ];

        console.log('Creando usuarios por defecto...');

        // Verificar si ya existen usuarios
        const existingUsers = await User.getUsers();
        if (existingUsers.length > 0) {
            console.log('Los usuarios ya existen. Eliminando usuarios existentes...');
            
            // Eliminar archivo de usuarios para empezar desde cero
            const usersFile = path.join(__dirname, '../data/users.json');
            await fs.writeFile(usersFile, JSON.stringify([], null, 2));
        }

        // Crear usuarios por defecto
        for (const userData of defaultUsers) {
            try {
                const user = await User.create(userData);
                console.log(`✅ Usuario creado: ${user.email} (${user.tipo_usuario})`);
            } catch (error) {
                console.log(`❌ Error creando usuario ${userData.email}: ${error.message}`);
            }
        }

        console.log('\n🎉 Usuarios por defecto creados exitosamente!');
        console.log('\n📋 Credenciales de prueba:');
        console.log('----------------------------------------');
        console.log('👨‍🎓 ESTUDIANTE:');
        console.log('   Email: estudiante@educonecta.com');
        console.log('   Password: 12345678');
        console.log('\n👩‍🏫 DOCENTE:');
        console.log('   Email: docente@educonecta.com');
        console.log('   Password: 12345678');
        console.log('\n👨‍💼 ADMIN:');
        console.log('   Email: admin@educonecta.com');
        console.log('   Password: 12345678');
        console.log('\n🏫 INSTITUCIÓN:');
        console.log('   Email: institucion@educonecta.com');
        console.log('   Password: 12345678');
        console.log('\n🏢 EMPRESA:');
        console.log('   Email: empresa@educonecta.com');
        console.log('   Password: 12345678');
        console.log('----------------------------------------');

    } catch (error) {
        console.error('Error al crear usuarios por defecto:', error);
    }
}

// Ejecutar el script
if (require.main === module) {
    createDefaultUsers();
}

module.exports = createDefaultUsers;
