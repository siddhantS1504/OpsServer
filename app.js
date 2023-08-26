const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const historyFilePath = path.join(__dirname, 'history.json');

let history = [];
if (fs.existsSync(historyFilePath)) {
  const historyData = fs.readFileSync(historyFilePath, 'utf8');
  history = JSON.parse(historyData);
}

app.get('/', (req, res) => {
  const endpointSamples = [
    '/',
    '/history',
    '/5/plus/3',
    '/3/minus/5',
    '/3/minus/5/plus/8',
    '/3/into/5/plus/8/into/6',
    '/6/divide/2',
    '/2/plus/3/plus/4',
    '/1/plus/2/plus/3/plus/4/plus/5/plus/6', // Sample endpoint with 6 operands
    // Add more sample endpoints here
  ];
  const samplesHTML = endpointSamples.map(endpoint => `<li><a href="${endpoint}">${endpoint}</a></li>`).join('');
  const html = `<h1>Sample Endpoints:</h1><ul>${samplesHTML}</ul>`;
  res.send(html);
});

app.get('/history', (req, res) => {
  res.json(history);
});

app.get('/:operands/:operation/:operands2?/:operation2?/:operands3?/:operation3?/:operands4?/:operation4?/:operands5?/:operation5?/:operands6?', (req, res) => {
  const { operands, operation, operands2, operation2, operands3, operation3, operands4, operation4, operands5, operation5, operands6 } = req.params;

  const operations = {
    'plus': '+',
    'minus': '-',
    'into': '*',
    'divide': '/',
  };

  const decodedOperation = operations[operation];
  const decodedOperation2 = operation2 ? operations[operation2] : '';
  const decodedOperation3 = operation3 ? operations[operation3] : '';

  const mathExpression = (operands6)
    ? `${operands} ${decodedOperation} ${operands2} ${decodedOperation2} ${operands3} ${decodedOperation3} ${operands4} ${operations[operation4]} ${operands5} ${operations[operation5]} ${operands6}`
    : (operands5)
    ? `${operands} ${decodedOperation} ${operands2} ${decodedOperation2} ${operands3} ${decodedOperation3} ${operands4} ${operations[operation4]} ${operands5}`
    : (operands4)
    ? `${operands} ${decodedOperation} ${operands2} ${decodedOperation2} ${operands3} ${decodedOperation3} ${operands4}`
    : (operands3)
    ? `${operands} ${decodedOperation} ${operands2} ${decodedOperation2} ${operands3}`
    : (operands2)
    ? `${operands} ${decodedOperation} ${operands2}`
    : `${operands}`;

  try {
    result = eval(mathExpression);
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
    return;
  }

  const question = (operands6)
    ? `${operands} ${operations[operation]} ${operands2} ${operations[operation2]} ${operands3} ${operations[operation3]} ${operands4} ${operations[operation4]} ${operands5} ${operations[operation5]} ${operands6}`
    : (operands5)
    ? `${operands} ${operations[operation]} ${operands2} ${operations[operation2]} ${operands3} ${operations[operation3]} ${operands4} ${operations[operation4]} ${operands5}`
    : (operands4)
    ? `${operands} ${operations[operation]} ${operands2} ${operations[operation2]} ${operands3} ${operations[operation3]} ${operands4}`
    : (operands3)
    ? `${operands} ${operations[operation]} ${operands2} ${operations[operation2]} ${operands3}`
    : (operands2)
    ? `${operands} ${operations[operation]} ${operands2}`
    : `${operands}`;

  const operationObj = { question, answer: result };

  if (history.length >= 20) {
    history.shift();
  }
  history.push(operationObj);

  fs.writeFileSync(historyFilePath, JSON.stringify(history), 'utf8');

  res.json(operationObj);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
