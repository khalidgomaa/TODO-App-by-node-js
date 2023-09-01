import express from 'express';
import connectToDatabase from './db/connection.js';
import userRouter from './modules/user/user.routes.js';
import taskRouter from './modules/task/task.routes.js';

const app = express();
app.use(express.json());
const port = 3000;
connectToDatabase();
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index',{
    page_title:"Home"
  });
});

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`toDo app listening on port ${port}!`));