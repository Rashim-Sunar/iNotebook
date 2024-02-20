const express = require('express')
const router = express.Router()

router.get('/user',(req,res)=>{
    obj={
        name:'rasim',
        age:20
    }
    res.json(obj);
})

module.exports = router