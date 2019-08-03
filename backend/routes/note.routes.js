module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    app.post('/api/notes', notes.create);
    app.get('/api/notes', notes.findAll);
    app.get('/api/notes/:noteId', notes.findOne);
    app.put('/api/notes/:noteId', notes.update);
    app.delete('/api/notes/:noteId', notes.delete);
}