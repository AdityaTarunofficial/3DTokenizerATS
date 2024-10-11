const express = require('express');
const router = express.Router();
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Home route to take user input
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});

// Route to handle tokenization and plotting
router.post('/tokenize', (req, res) => {
    const sentence = req.body.sentence;
    const tokens = tokenizer.tokenize(sentence);

    const x = [], y = [], z = [];
    tokens.forEach((token, index) => {
        x.push(index);
        y.push(token.length);
        z.push(Math.random() * 10);
    });

    const avgTokenLength = tokens.reduce((acc, token) => acc + token.length, 0) / tokens.length;
    const predictedTokenLength = avgTokenLength.toFixed(2);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>3D Token Plot</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <a class="navbar-brand" href="#">3D Tokenizer</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div class="container mt-5">
                <h1 class="text-center">3D Token Plot</h1>
                <p class="lead">Tokens: ${tokens.join(', ')}</p>
                <p class="lead">Prediction: The predicted next token length is: <strong>${predictedTokenLength} characters</strong></p>
                <div id="plot" class="mt-4"></div>
            </div>

            <script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>
            <script>
                const trace = {
                    x: ${JSON.stringify(x)},
                    y: ${JSON.stringify(y)},
                    z: ${JSON.stringify(z)},
                    mode: 'markers+text',
                    marker: { size: 12 },
                    text: ${JSON.stringify(tokens)},
                    type: 'scatter3d'
                };
                const layout = { scene: { xaxis: { title: 'Token Index' }, yaxis: { title: 'Token Length' }, zaxis: { title: 'Random Z' }}};
                Plotly.newPlot('plot', [trace], layout);
            </script>
        </body>
        </html>
    `);
});

module.exports = router;
