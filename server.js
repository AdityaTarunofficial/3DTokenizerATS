const express = require('express');
const app = express();
const tokenizerRoutes = require('./routes/tokenizer');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use tokenizer routes
app.use('/', tokenizerRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
