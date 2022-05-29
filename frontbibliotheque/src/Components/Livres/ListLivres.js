import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {loadLivres} from "../../Redux/action/livresAction"
import AfficheLivres from "./AfficheLivres"

const ListLivres=()=>{
    
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(loadLivres());
    });
  
  
    return(
        
        <div><AfficheLivres/></div>
    )
}
export default ListLivres
