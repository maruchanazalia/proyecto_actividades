const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;
const User = require('../models/user.model');

const login = async (req, res) => {
    const { user, password } = req.body;

    try {
        const [rows] = await pool.execute('SELECT * FROM usuarios WHERE user = ?', [user]);

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const userFound = rows[0];

        const isCorrectPass = await bcrypt.compare(password, userFound.password);

        if (!isCorrectPass) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos"
            });
        }

        const payload = {
            user: {
                _id: userFound.id
            }
        };

        const token = jwt.sign(payload, secretJWT, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Acceso concedido",
            token
        });
    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    login
};