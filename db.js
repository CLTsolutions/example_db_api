const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
   process.env.DB_DBNAME,
   process.env.DB_USER,
   process.env.DB_PASS,
   {
      host: process.env.DB_HOST,
      dialect: 'postgres',
   }
)

// if want to sync db (i.e need to drop tables)
// -- can do above by calling sync db and passing in db instance
async function syncDb(sequelize, options) {
   const { force, alter } = options

   try {
      if (force) await sequelize.sync({ force: true })
      else if (alter) await sequelize.sync({ alter: true })
      else await sequelize.sync()
   } catch (err) {
      console.log(err)
   }
}
// calling above fn to reset db in index.js

module.exports = {
   sequelize,
   syncDb,
}
