const { Sequelize } = require('sequelize');
const database = new Sequelize('database URL')

try {
    database.authenticate();
    //updates, but deletes database.
    // (async () => await Sequelize.sync({ force: true}));
    console.log('connected to Postgres');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = database;