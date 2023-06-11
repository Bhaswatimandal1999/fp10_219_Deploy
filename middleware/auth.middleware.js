const jwt = require("jsonwebtoken")
require("dotenv").config()


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret)
            if (decoded) {
                req.body.userID = decoded.userID
                req.body.user = decoded.user
                next()
            } else {
                res.status(400).json({ message: "Invalid token" })
            }
        } catch (err) {
            res.json({ error: err.message })
        }
    } else {
        res.status(400).json({ message: "No token" })
    }

}
module.exports = {
    auth
}