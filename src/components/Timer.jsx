import React , {useState , useEffect} from "react";
import style from ''
import {formatTime , calculateTime} from '../utils/auxiliaryFunctions'


const Timer =() => {
    const [time , setTime] = useState(0);

    const [initialTime , setInitialTime] = useState(0);
    const [isRunning , setIsRunning] = useState(false);
    const [editField , setEditField] = useState({field : null , value : 0})

    return(
       <div>
         <div>00 : 00 : 00</div>
            <button>Start</button>
            <button>Reset</button>
       </div>
    )
}

export default Timer;