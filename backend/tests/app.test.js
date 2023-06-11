const request = require('supertest')
const app = require('../app')

const taskname="hahaha home"
let taskid=""

describe('Add route', () => {
  it('should add new todo in mongodb and should return a list of updated todos from the db', async () => {
    const res = await request(app)
      .post('/addtodo').send({details:taskname, completed:true})
    expect(res.statusCode).toEqual(200)
    expect(res.body.some(e=>e.details==taskname)).toBe(true)
  })
})
describe('get alltodos', () => {
  it('should return todos list from the db and check wheather the task that was added in last test case is added or not', async () => {
    let res = await request(app)
      .get('/alltodos');
    const todos = res.body;
    expect(Array.isArray(todos)).toBe(true); // Check if todos is an array
    const hasHometask = todos.some(todo => todo.details == taskname);
    expect(hasHometask).toBe(true); // Check if any todo has details equal to "hometask"
    for(var i=0;i<todos.length;i++){
      if(todos[i].details==taskname){
        taskid=todos[i]._id
        console.log("success")
        break
      }
    }
  });
});
describe('PATCH /todos', () => {
  it('should update a todo item by setting its completed attribute to true. When it was created in last testcase this attribute was false', async () => {

    // Send a PATCH request to the update route with the id of the todo item
    const res = await request(app)
      .patch('/updatetodo')
      .send({ id: taskid });

    expect(res.status).toBe(200); // Check if the response status is 200

    const updatedItems = res.body;
    expect(Array.isArray(updatedItems)).toBe(true); // Check if updatedItems is an array

    const updatedItem = updatedItems.find(todo => todo._id === taskid);
    expect(updatedItem).toBeDefined(); // Check if the updated item is present in the list
    expect(updatedItem.completed).toBe(true); // Check if the completed attribute of the updated item is true
  });
});
describe('DELETE /todos', () => {
  it('should delete a todo item and return the remaining list', async () => {

    const res = await request(app)
      .delete('/deletetodo')
      .send({ id: taskid });

    expect(res.status).toBe(200); 

    const remainingItems = res.body;
    expect(Array.isArray(remainingItems)).toBe(true); // Check if remainingItems is an array

    const hasDeletedItem = remainingItems.some(todo => todo._id === taskid);
    expect(hasDeletedItem).toBe(false);
  });
});