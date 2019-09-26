
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db',
    logging: false,
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Database is connected');
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
  })();

const db = {
    sequelize,
    Sequelize,
    models: {},
};

// db.models.Course = require('./models/course.js')(sequelize);
db.models.User = require('./models/User.js')(sequelize);

module.exports = db;