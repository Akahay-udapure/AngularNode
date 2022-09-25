const router = require('express').Router();
const Events = require('../models/event');
const auth = require('../helper/helper');

router.post('/add', async(req, res)=>{
    try {
        let event = await new Events(req.body).save();
        res.json({ status: 200, message: "Event Added Success!", data: event });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getAll', auth, async(req, res)=>{
    try {
        let event = await Events.find();
        res.json({ status: 200, message: "Event Found Success!", data: event });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.get('/getAllEvents', async(req, res)=>{
    try {
        let event = await Events.find({},{"name":1,"_id":0, "date":1,});
        res.json({ status: 200, message: "Event Found Success!", data: event });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})

module.exports = router;