const express = require("express")
const app = express()
const port = 3000;
const {Restaurant, Menu, Item} = require("./models/index")
const {sequelize} = require("./db")

//TODO: 

app.listen(port, () => {
    sequelize.sync()
    console.log("App listening on port " + port)
})

//restaurants with attached menu & items
app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.findAll({
        include: Menu,
        include: [{
            model: Menu,
            include: [{
                model: Item
            }]
        }]
    })
    res.json(allRestaurants)
})