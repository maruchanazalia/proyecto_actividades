const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS_BCRYPT);
        
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        return res.status(200).json({
            message: "Usuario creado exitosamente",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al crear el usuario",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getById(userId);

        if (!user) {
            return res.status(404).json({
                message: `No se encontró el usuario con ID ${userId}`
            });
        }

        return res.status(200).json({
            message: "Usuario encontrado exitosamente",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener el usuario",
            error: error.message
        });
    }
}

module.exports = {
    create,
    getById
};
