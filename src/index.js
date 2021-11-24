const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/* teste padrão */
app.get('/', (req, res) => {
    res.send('Hello');
});

/* routes  */
require('./router')(app);

app.listen(3000, () => {
    console.log('Welcome to Json reader API');
});
