const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(app.get('env'));
// console.log(process.env);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Listenning on port.... ${PORT}...`));
