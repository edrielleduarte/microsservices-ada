const jwt = require('jsonwebtoken')

class SessionService {
    static create(user) {
        return jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: 3000
        })
    }
}

module.exports = SessionService