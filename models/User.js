const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class User {
    constructor() {
        this.usersFile = path.join(__dirname, '../data/users.json');
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

    async findByEmail(email) {
        const users = await this.getUsers();
        return users.find(user => user.email === email);
    }

    async findById(id) {
        const users = await this.getUsers();
        return users.find(user => user.id === id);
    }

    async validatePassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            return null;
        }

        const hashedPassword = this.hashPassword(password);
        if (user.password === hashedPassword) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        return null;
    }

    async updatePrimerLogin(userId) {
        const users = await this.getUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            users[userIndex].primer_login = false;
            await this.saveUsers(users);
            return true;
        }
        
        return false;
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}

module.exports = new User();
