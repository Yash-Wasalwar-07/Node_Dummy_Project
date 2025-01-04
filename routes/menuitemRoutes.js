const express = require('express');
const router = express.Router();

const MenuItem = require('../models/Menu');

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        //Create a new person
        const newMenu = new MenuItem(data);

        //Save the person to the database
        const savedMenu = await newMenu.save();
        console.log("menu data saved");
        res.status(200).json(savedMenu);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/', async (req, res) => {
    try{
        const menuitems = await MenuItem.find();
        res.status(200).json(menuitems);
    } catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/:taste', async (req, res) => {
    try{
        const tasteData = req.params.taste;

        //Find menu items
        const menuItems = await MenuItem.find({taste: tasteData});
    
        if(menuItems.length === 0){
            return res.status(404).json({error:'Menu item not found'});
        }

        console.log("menu data fetched");
        res.status(200).json(menuItems);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedMenuItem = req.body;
    
        const response = await MenuItem.findByIdAndUpdate(id, updatedMenuItem, {
            new: true,
            runValidators: true
        });
    
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }
    
        console.log('Menu item updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.delete('/:id', async (req,res) => {
    try{
        const menuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuItemId);

        console.log(response);
        if(!response){
            return res.status(404).json({error:'Menu item not found'});
        }

        console.log('Menu item deleted');
        res.status(200).json({message:'Menu item deleted'});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

module.exports = router;