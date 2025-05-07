const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js running in AKS!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Healthy' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

