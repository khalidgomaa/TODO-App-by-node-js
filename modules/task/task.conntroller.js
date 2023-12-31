import taskModel from '../../db/model/task.model.js';
import userModel from '../../db/model/user.model.js';

const controlTask = {
  showAllTasks: async (req, res) => {
    try {
      const tasks = await taskModel.find().exec();
      res.render('tasks', { 
        tasks: tasks ,
        page_title:"Tasks"
      });
    } catch (err) {
      console.error(err);
    }
  },
  tasksWithOwner:async (req, res) => {
    try {
      const tasks = await taskModel.find().exec();
      const users = await userModel.find().exec();
  
      const tasksWithUserData = tasks.map(task => {
        const user = users.find(u => u._id === task.userId);
        return {...task, user };
      });
  
      res.json(tasksWithUserData);
    } catch (err) {
      console.error(err);
      res.send('Error retrieving tasks with user data');
    }
  }
  ,
  addTask: async (req, res) => {
    const { title, description, status, userId, assignTo, deadline } = req.body;
    const task = new taskModel({
      title,
      description,
      status,
      userId,
      assignTo,
      deadline,
    });
    await task.save();
    res.redirect('/tasks');
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await taskModel.findById(id);
    console.log(task)
    if (!task) {
      return res.json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.redirect('/tasks');
    res.json({ message: 'Task updated successfully' });
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    const result = await taskModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.redirect('/tasks');

  },
};

export default controlTask;