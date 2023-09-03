const fs = require('fs').promises;
const uuid = require('uuid');

class Store {
    async read() {
        const data = await fs.readFile('db/db.json', 'utf8');
        return JSON.parse(data);
    }

    async write(newNotes) {
        await fs.writeFile('db/db.json', JSON.stringify(newNotes));
    }

    async getNotes() {
        try {
            return await this.read();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async writeNote(newNote) {
        try {
            const notes = await this.getNotes();
            newNote.id = uuid.v4();
            const updatedNotes = [...notes, newNote];
            await this.write(updatedNotes);
            return newNote;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteNote(id) {
        try {
            const notes = await this.getNotes();
            const filteredNotes = notes.filter(note => note.id !== id);
            await this.write(filteredNotes);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Store();
