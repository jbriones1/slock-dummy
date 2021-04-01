const express = require('express');
const app = express();
// const PORT = process.env.PORT || 5000
const PORT = 8000

app.use(express.static('public'));

app.use(express.json())

app.get('/', (req, res) => { 
    res.end(); 
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));