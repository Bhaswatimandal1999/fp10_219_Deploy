const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


//registration
userRouter.post("/register", (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.json({ error: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
            }
        })
        res.json({ msg: "user has been registered", user: req.body })
    }
    catch (err) {
        res.json({ error: err.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user._id, user: user.name }, process.env.secret)
                    res.json({ msg: "user has been logged in", token })
                } else {
                    res.json({ error: "wrong credentials" })
                }
            })
        } else {
            res.json({ msg: "user doesn't exist" })
        }

    } catch (err) {
        res.json({ error: err.message })
    }
})


module.exports = {
    userRouter
}