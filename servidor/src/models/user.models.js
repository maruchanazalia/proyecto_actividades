const db = require("../configs/db.config");
const bcrypt = require("bcrypt");

class User {
    static async createUser(user) {
        const hashedPassword = await User.encryptPassword(user.password);
        const sql = "INSERT INTO usuarios(email, password) VALUES(?, ?)";
        
        await db.promise().query(sql, [user.email, hashedPassword]);
        
        const result = await User.findUsername(user.email);
        return result;
    }

    static async findUsername(username) {
        const [[rows]] = await db.promise().query("SELECT id, email, password FROM usuarios WHERE email=?", [username]);
        return rows;
    }

    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS_BCRYPT);
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(password, receivedPassword) {
        return await bcrypt.compare(password, receivedPassword);
    }
}

module.exports = User;
