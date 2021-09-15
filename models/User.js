// defining a fn (this is not calling sequelize.define)
// -- giving fn a sequelize instance and passing in datatypes
// -- can define instance and return it (User)
module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define('User', {
      username: {
         type: DataTypes.STRING,
      },
   })
   return User
}
