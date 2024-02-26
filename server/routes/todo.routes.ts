import express from 'express'
import { userAuth } from '../middleware/user.middleware'
const router = express.Router()
const { postTodo, getTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller");

//todo
router.use(userAuth)

router.post('/post', postTodo);
router.get('/get', getTodo);
router.patch('/update/:Id', updateTodo);
router.delete('/delete/:Id', deleteTodo);

module.exports = router;