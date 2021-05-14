const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!... shutting down...');
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database connection: SUCCESSFUL...');
  });

// console.log(app.get('env'));
//console.log(process.env);

const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV.toUpperCase();

const server = app.listen(PORT, () => {
  console.log(
    `\nListenning on port:  ${PORT}... \nUsing environment:   ${ENV}...\n`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!... shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
