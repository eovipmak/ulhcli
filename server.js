const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(helmet());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 