const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Group 4! Votre pipeline est maintenant OK');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
