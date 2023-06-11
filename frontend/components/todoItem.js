import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CgRadioCheck,CgCheckO } from "react-icons/cg";


export default function TodoItem(props) {
    const data= props.data

    const deleteitem=()=>{
        props.delete(data._id)
    }

    const updateitem=()=>{
        props.update(data._id, data.completed)
    }
    

    return(
        <div className="flex items-center justify-between border-y-2 py-4" key={data._id}>
          <div className="flex items-center">
            <div onClick={()=>updateitem()}>{data.completed?<CgCheckO className="h-8 w-8 text-orange-500"/>:<CgRadioCheck className="h-8 w-8 text-orange-500"/>}</div><div className="text-xl ml-4">{data.details}</div>
          </div>
          <div onClick={()=>deleteitem()}><MdDelete className="h-8 w-9 text-red-700"/></div>
        </div>
      )

}