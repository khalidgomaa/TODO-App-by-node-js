import taskModel from "../../db/model/task.model.js";
let controlTask={
     showAllTasks : async(req,res)=> {
        try {
          const tasks = await taskModel.find().exec();
          res.json({ message: tasks });
        } catch (err) {
          console.error(err);
        }
      }
      ,
    addTask:async(req,res)=>{
        let { title, description,status,userId,assignTo, deadline} = req.body;
        console.log(req.body)
        let taskData = await taskModel.insertMany({
              title,
              description,
              status,
              userId,
              assignTo,
              deadline
            } );
        
    },
    // updating tasks function
    updateTask: async (req, res) => {
      const { id } = req.params;
      const { title, description, status } = req.body;
    
      // Check if the task exists
      const task = await taskModel.findById(id);
      // console.log(task)
      console.log(task.userId)
      console.log(id)
  
      console.log( req.body.userId)
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      let ownerId =new ObjectId(req.body.userId)
      // Check if the user is authorized to update the task
      if (task.userId!== ownerId) {
        return res.json({ message: "You are not authorized to update this task" });
      }
    
      // Update the task
      task.title = title;
      task.description = description;
      task.status = status;
      await task.save();
    
      res.json({ message: "Task updated successfully" });
    },
    // function to delete task
    deleteTask: async (req, res) => {
      const { id } = req.params;
      const task = await taskModel.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
   
      let ownerId =new ObjectId(req.body.userId)
      if (task.userId!== ownerId) {
        return res.status(403).json({ message: "You are not authorized to delete this task" });
      }
  
      // Delete the task
      await task.remove();
  
      res.json({ message: "Task deleted successfully" });
    },
}
export default  controlTask 