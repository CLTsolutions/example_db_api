// GREAT PLACE TO DEFINE ASSOCIATIONS

// Grab db instance
const { sequelize, syncDb } = require('../db')
const { DataTypes } = require('sequelize')

// Grab Model Functions
// this is what creates our tables
// take fn from User and call it DefineUser
const DefineUser = require('./User')
const DefinePost = require('./Post')

// pass sequelize and DataTypes into DefineUser and set it to User
const User = DefineUser(sequelize, DataTypes) // Defines the model
const Post = DefinePost(sequelize, DataTypes) // Defines the model

/* IN CLASS EXAMPLE
const Profile: DefineProfile(sequelize, DataTypes)

User.hasMany(Profile)
Profile.belongsTo(User) */

// Define Associations
User.hasMany(Post)
Post.belongsTo(User)

// Sync
// true drops table
// alter removes old data and makes necessary changes
// -- great if added new data
syncDb(sequelize, { alter: true })

// exporting models to be used
module.exports = { User, Post }
