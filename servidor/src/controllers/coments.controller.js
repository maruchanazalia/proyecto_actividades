const Comentario = require('../models/comentario.model');

const getAll = async (req, res) => {
    try {
        const comentarios = await Comentario.getAll();
        return res.status(200).json({
            message: "Comentarios obtenidos exitosamente",
            data: comentarios
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener los comentarios",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const idComentario = req.params.id;
        const comentario = await Comentario.getById(idComentario);

        if (!comentario) {
            return res.status(404).json({
                message: `No se encontró el comentario con id ${idComentario}`
            });
        };

        return res.status(200).json({
            message: "Comentario encontrado exitosamente",
            data: comentario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener el comentario",
            error: error.message
        });
    }
}

const getByActividadId = async (req, res) => {
    try {
        const idActividad = req.params.actividadId;
        const comentarios = await Comentario.getByActividadId(idActividad);

        return res.status(200).json({
            message: "Comentarios obtenidos exitosamente",
            data: comentarios
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener los comentarios",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const { contenido, fechaCreacion, actividadId, usuarioId } = req.body;
        const comentario = await Comentario.create({ contenido, fechaCreacion, actividadId, usuarioId });

        return res.status(201).json({
            message: "Comentario creado exitosamente",
            data: comentario
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al crear el comentario",
            error: error.message
        });
    }
}

const deleteById = async (req, res) => {
    try {
        const idComentario = req.params.id;
        await Comentario.deleteById(idComentario);

        return res.status(200).json({
            message: "Se eliminó el comentario correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el comentario",
            error: error.message
        });
    }
}

const updateById = async (req, res) => {
    try {
        const idComentario = req.params.id;
        const { contenido } = req.body;
        await Comentario.updateById(idComentario, { contenido });

        return res.status(200).json({
            message: "El comentario se actualizó correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el comentario",
            error: error.message
        });
    }
}

module.exports = {
    getAll,
    getById,
    getByActividadId,
    create,
    deleteById,
    updateById
}
