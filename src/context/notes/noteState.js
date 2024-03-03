import React,{useState} from "react";
import noteContext from "./noteContext";

const noteState = (props) => {
    const [state,setState]=useState({
        "name" : "rashim",
        "class" : "5b"
    });

    const update = () =>{
        setTimeout(() => {
            setState({
                "name" : `"anita`,
                "class" : "5a"
            })
        }, 1000);
    }

    return(
        <noteContext.Provider value = {{state,update}}>
           { props.children}
        </noteContext.Provider>
    )
}

export default noteState;