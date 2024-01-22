const express = require("express");
const router = express.Router();

const comentariosController = require("../controllers/comentarios.controller");

// Obtener todos 
router.get("/", comentariosController.getAll);

// Obtener
router.get("/:id", comentariosController.getById);

// Obtener
router.get("/actividad/:actividadId", comentariosController.getByActividadId);

// Crear 
router.post("/", comentariosController.create);

// Eliminar xid
router.delete("/:id", comentariosController.deleteById);

// Actualizar xid
router.put("/:id", comentariosController.updateById);

module.exports = router;
