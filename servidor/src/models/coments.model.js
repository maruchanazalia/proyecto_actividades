const db = require('../configs/db.config');

class Comentario {

    constructor({ id, contenido, fechaCreacion, actividadId, usuarioId }) {
        this.id = id;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.actividadId = actividadId;
        this.usuarioId = usuarioId;
    }

    static async getAll() {
        const connection = await db.createConnection();
        const [rows] = await connection.query("SELECT id, contenido, fecha_creacion, actividad_id, usuario_id FROM comentarios");
        connection.end();

        return rows.map(row => new Comentario({
            id: row.id,
            contenido: row.contenido,
            fechaCreacion: row.fecha_creacion,
            actividadId: row.actividad_id,
            usuarioId: row.usuario_id
        }));
    }

    static async getById(id) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT id, contenido, fecha_creacion, actividad_id, usuario_id FROM comentarios WHERE id = ?", [id]);
        connection.end();

        if (rows.length > 0) {
            const row = rows[0];
            return new Comentario({
                id: row.id,
                contenido: row.contenido,
                fechaCreacion: row.fecha_creacion,
                actividadId: row.actividad_id,
                usuarioId: row.usuario_id
            });
        }

        return null;
    }

    static async getByActividadId(actividadId) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT id, contenido, fecha_creacion, actividad_id, usuario_id FROM comentarios WHERE actividad_id = ?", [actividadId]);
        connection.end();

        return rows.map(row => new Comentario({
            id: row.id,
            contenido: row.contenido,
            fechaCreacion: row.fecha_creacion,
            actividadId: row.actividad_id,
            usuarioId: row.usuario_id
        }));
    }

    static async create({ contenido, fechaCreacion, actividadId, usuarioId }) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("INSERT INTO comentarios (contenido, fecha_creacion, actividad_id, usuario_id) VALUES (?, ?, ?, ?)",
            [contenido, fechaCreacion, actividadId, usuarioId]);

        connection.end();

        if (result.insertId === 0) {
            throw new Error("No se insertó el comentario");
        }

        return new Comentario({
            id: result.insertId,
            contenido,
            fechaCreacion,
            actividadId,
            usuarioId
        });
    }

    static async deleteById(id) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM comentarios WHERE id = ?", [id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("No se eliminó el comentario");
        }

        return;
    }

    static async updateById(id, { contenido }) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("UPDATE comentarios SET contenido = ? WHERE id = ?", [contenido, id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("No se actualizó el comentario");
        }

        return;
    }
}

module.exports = Comentario;
