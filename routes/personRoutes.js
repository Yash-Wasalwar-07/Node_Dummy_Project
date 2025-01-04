const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        //Create a new person
        const newPerson = new Person(data);

        //Save the person to the database
        const savedPerson = await newPerson.save();
        console.log("person data saved");
        res.status(200).json(savedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/', async (req, res) => {
    try{
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get('/:work', async (req, res) => {
    try{
        const workType = req.params.work;
        //Fetch person data
        const persons = await Person.find({work: workType});

        if(persons.length === 0){
            return res.status(404).json({error:'Person not found'});
        }

        console.log("person data fetched");
        res.status(200).json(persons);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true //Run mongoose validators
        });

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
    
        if(!response){  
            return res.status(404).json({error:'Person not found'});
        }
    
        console.log('Data deleted');
        res.status(200).json({messge:'Person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;