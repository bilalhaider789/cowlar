const express= require('express');

const todoControllers= require('../controllers/todoController')
const router= express.Router()


router.get('/',todoControllers.demo)
router.get('/alltodos',todoControllers.allTodos)
router.post('/addtodo',todoControllers.addtodo)
router.delete('/deletetodo',todoControllers.deletetodo)
router.patch('/updatetodo',todoControllers.updatetodo)


module.exports= router;