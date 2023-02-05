import React, { useEffect, useState } from "react";
import { Table,Button } from 'semantic-ui-react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Navbar from "../Navbar";

import Footer from "../Footer";

const Read = () => {
    
  const [apiData, setApiData] = useState([]);
  const [visible, setVisible] = useState(true);
 
  useEffect(() => {
     const data=async()=>
     {
        var dataset= await  axios.get('api/employee/read')
        setApiData(dataset.data);
     };
            
       
         
  },[])
  const getData=()=>
    {
      axios.get('/api/employee/read')
      .then((getData)=>{
      /*  setApiData(getData.data);*/
        console.log(getData.data);
      })
    }
    const onDelete=(id)=>
    {
      axios.delete('/api/employee/delete/'+id)
      .then((response)=>
      {if(response.data.status==="success")
      {
        alert("Employee deleted successfully");
        getData();
      }
      else
      {
        alert("Something went wrong");
      }
      })
    }
    
    const setData=(id,name,position,location,salary)=>{
      localStorage.setItem("ID",id);
      localStorage.setItem("name",name);
      localStorage.setItem("position",position);
      localStorage.setItem("location",location);
      localStorage.setItem("salary",salary);
          
    }
  return (
    <div>

 <section class="Background">
      
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col ">
            <div class="card card-table" >
              <div class="row g-0">
              <div class="d-flex justify-content-center pt-3">
              <h1 class="fw-Bolder mb-3 pb-3 headeing" >Employee List</h1>
              </div>

       </div><div class="d-flex justify-content-center pt-3">
              <Link to='/create'>
                     {visible &&<button type="button" class="btn btn-secondary btn-lg">Create New Employee</button>}
                     </Link>
                    </div> 
  
              </div>
            </div>
          </div>
        </div>
    

  </section>

<Footer/>



    </div>
  )
}

export default Read