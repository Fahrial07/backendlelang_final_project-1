const jwt = require("jsonwebtoken");
const { users } = require("../models/index");

module.exports = {

    async checkToken (req, res, next){
        try {

            const checkToken = req.headers.authorization;
            const token = checkToken.split("Bearer ")[1];

            const payload = await jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

            req.user = await users.findByPk({ where: { id: payload.id } });

            next();
        } catch (error) {
            res.status(401).json({
                status: "Error",
                message: "Unauthorized",
            })
        }
    }
}
