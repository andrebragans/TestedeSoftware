const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, '/frontend/built')));
app.get('/names', (req, res) => {
    res.send("Telmo")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})