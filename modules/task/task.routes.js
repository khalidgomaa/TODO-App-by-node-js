
import express from "express"
import controlTask from'./task.conntroller.js'

const taskRouter = new express.Router()

taskRouter.post('/', controlTask.addTask )
taskRouter.post('/tasks', controlTask.showAllTasks )
taskRouter.patch('/tasks/:id', controlTask.updateTask )
taskRouter.delete('/tasks/:id', controlTask.deleteTask )


export default taskRouter  