//DEPENDENCIES
const events = require('express').Router();
const db = require('../models');
const {Event, Stage, Set_Time, Meet_Greet} = db;
const {Op} = require('sequelize');

//FIND ALL EVENTS
events.get('/', async (req, res) => {
    try{
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        });
        res.status(200).json(foundEvents)
    } catch (error){
        res.status(500).json(error)
    }
})

//FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try{
        const foundEvent = await Event.findOne({
            where: {name: req.params.name},
            include: [{
                model: Stage,
                as: 'stages', 
                include: {
                    model: Set_Time,
                    as: 'set_times', 
                    where: {name: {[Op.like]: `%${req.query.set_time ? req.query.set_time : ''}`}}
                }
            }, 
            {
                model: Meet_Greet,
                as: 'meet_greets'
            }]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE AN EVENT
events.post('/', async (req, res) => {
    try{
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE AN EVENT
events.put('/:id', async (req, res) => {
    try{
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents}`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE AN EVENT
events.delete('/:id', async (req, res) => {
    try{
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents}`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORT 
module.exports = events