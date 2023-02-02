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
            
       data(); 
         
  },[])
  const getData=()=>
    {
      axios.get('http://localhost:8082/api/employee/read')
      .then((getData)=>{
      /*  setApiData(getData.data);*/
        console.log(getData.data);
      })
    }
    const onDelete=(id)=>
    {
      axios.delete('http://localhost:8082/api/employee/delete/'+id)
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
              <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Position</Table.HeaderCell>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Salary</Table.HeaderCell>
        {visible &&
        <Table.HeaderCell>Update</Table.HeaderCell>}
         {visible &&
        <Table.HeaderCell>Delete</Table.HeaderCell>}
        
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {Array.isArray(apiData)
        ? apiData.map(data=>{
return(
  <Table.Row >
        <Table.Cell>{data.name}</Table.Cell>
        <Table.Cell>{data.position}</Table.Cell>
        <Table.Cell>{data.location}</Table.Cell>
        <Table.Cell>{data.salary}</Table.Cell>
        {visible &&
        <Table.Cell>
          <Link to='/update'>
          <Button color="green" onClick={()=>setData(data._id,data.name,data.position,data.location,data.salary)}>Update</Button>
          </Link>
        </Table.Cell>}
        {visible &&
        <Table.Cell>
        
          <Button color="red" onClick={()=>onDelete(data._id)}>Delete</Button>
       
        </Table.Cell>}
        
      </Table.Row>
)

     }): null}
    
    
    </Table.Body>
   
  </Table>
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