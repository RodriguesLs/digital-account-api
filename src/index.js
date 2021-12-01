const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const welcomeMessage = `Application running in ${PORT}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* teste padrão */
app.get('/', (req, res) => {
  res.send(welcomeMessage);
});

/* routes  */
require('./router')(app);

app.listen(PORT, () => {
  console.log(welcomeMessage);
});
