import React from "react";
import { Link } from "react-router-dom";
export const FoodInfoItems = () =>{

    return(
        <div style={{display:"flex",flexDirection:"column",fontSize:"17px",marginTop:"60px",marginBottom:"50px",alignItems:"center",justifyContent:"center",gap:"60px",height:"50vh"}}>
            <h3><Link to ="/Food chatbot"  style={{color:"white",textDecoration:"none",border:"2px solid black",borderRadius:"10px",boxShadow: "5px 0px 20px rgba(255, 2, 2, 0.7)"
,padding:"5px 5px"}}>Food ChatBot</Link></h3>
            <h3><Link to ="/Calorie estimation"  style={{color:"white",textDecoration:"none",border:"2px solid black",borderRadius:"10px",boxShadow: "5px 0px 20px rgba(255, 2, 2, 0.7)"
,padding:"5px 5px" }}>Calorie Estimation</Link></h3>
            <h3><Link to ="/Cooking info"  style={{color:"white",textDecoration:"none",border:"2px solid black",borderRadius:"10px",boxShadow: "5px 0px 20px rgba(255, 2, 2, 0.7)"
,padding:"5px 5px"}}>Cooking Videos</Link></h3>
        </div>
    )
}
