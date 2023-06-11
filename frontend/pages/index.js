
import { useEffect, useState } from "react";
import TodoItem from "../components/todoItem";
import LoadingModal from "../components/modals/loadingModal";
import ErrorModal from "../components/modals/errorModal";

export default function Home() {
  const [newItem, setNewItem] = useState("");
  const [loading,setloading]=useState(false)
  const [items,setitems]=useState([])
  const [error, seterror]=useState(false)

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      addItem();
    }
  };

  const getitem=async() => {
    try {
      setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}alltodos`);
      const data = await response.json();
      console.log(data)
      setitems(data)
      setloading(false)
    } catch (e) {
      setloading(false)
      seterror(true)
      console.log("error")
    }
  };

  useEffect(()=>{
    getitem()
  },[])

  const addItem = async() => {
    console.log(newItem);
    if(newItem==""){
      alert("Task can't be empty")
      return
    }
    try {
      setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}addtodo`, {
        method: "POST",
        body: JSON.stringify({
          details: newItem,
          completed: false,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      setitems(data)
      setloading(false)
      setNewItem("")
    } catch (e) {
      setloading(false)
      seterror(true)
      console.log("error")
    }
  };

  const deleteitem=async(id)=>{
    try {
      setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}deletetodo`, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      setitems(data)
      setloading(false)
    } catch (e) {
      setloading(false)
      seterror(true)
      console.log("cant delete item")
    }
  }

  const updateitem=async(id, completed)=>{
    try {
      
      setloading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}updatetodo`, {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          completed: !completed
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data)
      setitems(data)
      setloading(false)
    } catch (e) {
      setloading(false)
      seterror(true)
      console.log("cant update item")
    }
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute z-0">
        <img
          className="object-fill object-center w-screen h-screen"
          src="/images/brown.jpg"
          alt="Background"
        />
      </div>
      <div className="z-10">
        <div className="flex w-full justify-center mb-10">
          <img src="/images/pic.png" className="h-28 w-28 rounded-full" />
        </div>
        <div className="h-[600px] w-[450px] bg-gray-50 rounded-2xl p-6">
          <div className="w-full flex justify-between items-center border-b-4 pb-4">
            <div className="text-3xl font-semibold text-orange-400" onClick={()=>console.log(process.env.NEXT_PUBLIC_SERVER)}>
              Cowlar ToDo List
            </div>
            <div className="font-semibold">Date: {formattedDate}</div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <input
                className="w-[95%] my-4 py-2 px-2 border-2 rounded-lg placeholder-slate-600 bg-slate-200"
                type="text"
                placeholder="Enter New Task"
                value={newItem}
                onChange={(e)=>setNewItem(e.target.value)}
                onKeyDown={handleKeyPress}
              ></input>
              <div className="bg-orange-400 py-2 px-4 text-white font-semibold rounded-lg ml-2 cursor-pointer hover:bg-orange-600"
                onClick={()=>addItem()}
              >
                Add
              </div>
            </div>

            <div className="h-[420px] overflow-auto">
              
              {
                items.map((e)=><TodoItem data={e} key={e._id} delete={deleteitem} update={updateitem}/>)
              }
              
            </div>
            
          </div>
        </div>
        {
          loading && <LoadingModal/>
        }
        {
          error && <ErrorModal onsubmit={seterror}/>
        }
      </div>
    </div>
  );
}
