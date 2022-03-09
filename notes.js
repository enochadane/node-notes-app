const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgGreen('Your Notes...'))
    notes.forEach((note) => {
        console.log(chalk.blue(note.title))
    })
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => title === note.title)

    // debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        console.log('Note Added successfully!')

        saveNote(notes)
    } else {
        console.log('Note title is already taken!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length !== notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'))
        saveNote(notesToKeep)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.bgBlue(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}