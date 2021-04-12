const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('../../models/routeModel');

dotenv.config({ path: './config.env' });

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
    console.log('DB connection successful!');
  });

// READ JSON FILE
const routes = JSON.parse(
  fs.readFileSync(`${__dirname}/routes-simple.json`, 'utf8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Route.create(routes);
    console.log('Seed data loaded into Db');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Route.deleteMany();
    console.log('Db data delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
