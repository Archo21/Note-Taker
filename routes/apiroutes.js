const fs = require("fs");
const util = require("util")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

module.exports = (app) => {
  app.get('/api/notes', async(req, res) => {
  const notes = await readFileAsync("./db/db.json","utf8") 
  const pastNotes = [].concat(JSON.parse(notes))
    return res.json(pastNotes);
  });
  app.post('/api/notes', async (req, res) => {
    const notes = await readFileAsync('./db/db.json', 'utf8');
    const pastNotes = [].concat(JSON.parse(notes));
    let newNote = {
      id: Math.floor(Math.random() * 10000),
      title: req.body.title,
      text: req.body.text,
    };
    const newNoteArray = [...pastNotes, newNote];
    await writeFileAsync('./db/db.json', JSON.stringify(newNoteArray));
    res.json(newNote);
  });
    

  app.delete('/api/notes/:id', function(req, res) {
      const deleteNote = req.params.id;
      console.log(deleteNote);

      fs.readFile('./db/db.json', (err, noteJson) => {
        if (err) throw err;
        dbNotes = JSON.parse(noteJson);
        for (let i = 0; i < dbNotes.length; i++) {
          if (dbNotes[i].id === Number(deleteNote)) {
            dbNotes.splice([i], 1);
          }
        }
        console.log(dbNotes);
        stringData = JSON.stringify(dbNotes);

        fs.writeFile('./db/db.json', stringData, (err),(notes) => {
          if (err) throw err;
        });
      });
      res.status(200).send();
    });

  }
