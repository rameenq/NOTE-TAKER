const router = require('express').Router();
const store = require('../db/store');

// Use async/await and try/catch for better readability and error handling
router.get('/notes', async (req, res, next) => {
    try {
        const notes = await store.getNotes();
        res.json(notes);
    } catch (err) {
        next(err);
    }
});

router.post('/notes', async (req, res, next) => {
    try {
        const newNote = await store.writeNote(req.body);
        res.json(newNote);
    } catch (err) {
        next(err);
    }
});

router.delete('/notes/:id', async (req, res, next) => {
    try {
        await store.deleteNote(req.params.id);
        res.json({ note: `${req.params.id} deleted` });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
