const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class User {
    constructor() {
        this.usersFile = path.join(__dirname, 'data/users.json');
        this.initializeUsersFile();
    }

    async initializeUsersFile() {
        try {
            await fs.access(this.usersFile);
        } catch (error) {
            // Si el archivo no existe, crearlo con un array vacío
            await fs.writeFile(this.usersFile, JSON.stringify([], null, 2));
        }
    }

    async getUsers() {
        try {
            const data = await fs.readFile(this.usersFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveUsers(users) {
        await fs.writeFile(this.usersFile, JSON.stringify(users, null, 2));
    }

    async create(userData) {
        const users = await this.getUsers();
        
        // Verificar si el email ya existe
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado');
        }

        // Hash de la contraseña
        const hashedPassword = this.hashPassword(userData.password);

        const newUser = {
            id: Date.now().toString(),
            nombres: userData.nombres,
            apellidos: userData.apellidos,
            email: userData.email,
            telefono: userData.telefono || '',
            password: hashedPassword,
            tipo_usuario: userData.tipo_usuario,
            fecha_registro: new Date().toISOString(),
            primer_login: true,
            activo: true
        };

        users.push(newUser);
        await this.saveUsers(users);

        // Retornar usuario sin contraseña
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

async function createTestStudent() {
    try {
        const user = new User();
        
        // Crear usuario estudiante de prueba
        const studentData = {
            nombres: 'Juan',
            apellidos: 'Pérez Estudiante',
            email: 'estudiante@test.com',
            telefono: '04141234567',
            password: '123456',
            tipo_usuario: 'estudiante'
        };

        const student = await user.create(studentData);
        console.log('✅ Usuario estudiante creado exitosamente:');
        console.log('Email:', student.email);
        console.log('Contraseña:', '123456');
        console.log('Tipo:', student.tipo_usuario);
        console.log('ID:', student.id);
        
    } catch (error) {
        if (error.message === 'El correo electrónico ya está registrado') {
            console.log('✅ El usuario estudiante ya existe:');
            console.log('Email:', 'estudiante@test.com');
            console.log('Contraseña:', '123456');
            console.log('Tipo:', 'estudiante');
        } else {
            console.error('❌ Error al crear usuario:', error.message);
        }
    }
}

// Ejecutar la función
createTestStudent();
