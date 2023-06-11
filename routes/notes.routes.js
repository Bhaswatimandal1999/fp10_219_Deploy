const express = require("express")
const { NoteModel } = require("../model/note.model")
const { auth } = require("../middleware/auth.middleware")

const notesRouter = express.Router()


notesRouter.use(auth)

notesRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.json({ msg: "new note has been added", note: req.body })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})



notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({ userID: req.body.userID })
        res.send(notes)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})



notesRouter.patch("/update/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc === userIDinNoteDoc) {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.json({ msg: `${note.title} has been update` })

        } else {
            res.status(400).json({ error: "you are not authorized to update this note" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

})



notesRouter.delete("/delete/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc === userIDinNoteDoc) {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.json({ msg: `${note.title} has been deleted` })

        } else {
            res.status(400).json({ error: "you are not authorized to update this note" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

})



module.exports = {
    notesRouter
}