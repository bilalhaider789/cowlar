const Todo = require("../models/todo");


const demo = async (req, res) => {
    console.log("requested todo")
    const items = await Todo.find(); 

    res.status(200).json(items);
};

const allTodos = async (req, res) => {
    console.log("requested todo")
    const items = await Todo.find(); 

    res.status(200).json(items);
};

const addtodo=async(req,res)=>{
    const data=req.body
    console.log(data)
    try{
        const createdTodo= new Todo({
            details: data.details,
            completed: data.completed,
        })
        createdTodo.save()
        const items = await Todo.find();
        res.status(200).json(items);
    }
    catch(e){
        console.log(e)
        res.send({"success":"0"})
    }
}

const deletetodo = async (req, res) => {
    try{
    const id= req.body.id
    console.log(id)
    await Todo.findByIdAndDelete(id)
    const items = await Todo.find();
        res.status(200).json(items);
    }
    catch(e){
        console.log(e)
        res.send({"success":"0"})
    }
};

const updatetodo = async (req, res) => {
    try{
    const id= req.body.id
    const completed=req.body.completed
    console.log(id)
    await Todo.findByIdAndUpdate(id,{completed: completed})
    // item.completed=completed
    // item.save()
    const items = await Todo.find();
    res.status(200).json(items);
    }
    catch(e){
        console.log(e)
        res.send({"success":"0"})
    }
};
  

exports.demo = demo;
exports.addtodo = addtodo;
exports.allTodos=allTodos;
exports.deletetodo=deletetodo;
exports.updatetodo=updatetodo;