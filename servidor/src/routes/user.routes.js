const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/http/auth.middleware');

router.get('/:id', authMiddleware.verifyJWT, usersController.getById);
router.post('/', usersController.create);
router.delete('/:id', authMiddleware.verifyJWT, (req, res) => {
    res.json({ message: 'Eliminar usuario por ID', userId: req.params.id });
});

module.exports = router;

