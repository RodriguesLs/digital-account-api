const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

/* teste padrão */
app.get('/', (req, res) => {
    res.send(`Application running in ${PORT}`);
});

/* routes  */
require('./router')(app);

app.listen(PORT, () => {
    console.log('Welcome to Json reader API');
});
