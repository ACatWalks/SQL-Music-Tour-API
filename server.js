// DEPENDENCIES
const express = require('express')
const app = express()
const {Sequelize} = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.PG_URI, 'postgres', 'JAAEW314159jaaew', {
    host: 'localhost',
    dialect: 'postgres'
});

try{
    sequelize.authenticate();
    console.log(`Connected with Sequelize at ${process.env.PG_URI}`)
} catch(err){
    console.log(`Unable to connect to PG: ${err}`)
}

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})

//const sequelize = new Sequelize('database', 'username', 'password', {
    //host: 'localhost',
    //dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  //});