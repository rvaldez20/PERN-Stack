import { Fragment, useState, useEffect } from "react";
import {Button, Card, CardContent, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function TaskList() {

   //se define el useState con las tasks
   const [tasks, setTasks] = useState([]);
   const navigate = useNavigate();

   const loadTasks = async() => {
      // se hace la petición fetch para trae
      const response = await fetch('http://localhost:4000/tasks');
      const data = await response.json();
      // console.log(data.tasks);
      setTasks(data.tasks);      
   }

   useEffect(() => {
      loadTasks();
   }, []);

   const handleDelete = async(id) => {      
      try {
         await fetch(`http://localhost:4000/tasks/${id}`, {
         method: "DELETE"
         });
         // const data = await res.json();
         // console.log(res);

         // se filtra todos las task diferentes
         setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <Fragment>
         <h1>Task List</h1>
         {
            tasks.map(task => (
               <Card 
                  key={task.id} 
                  style={{
                  marginBottom: "1rem",
                  backgroundColor: "#1e272e"
               }} >
                  <CardContent style={{
                     display: "flex",
                     justifyContent: "space-between"                     
                  }}>
                     <div>
                        <Typography style={{color:"#fff"}}>{task.title}</Typography>
                        <Typography style={{color:"#fff"}}>{task.description}</Typography>                     
                     </div>
                     
                     <div>
                        <Button 
                           variant="contained"
                           color="primary"
                           onClick={() => navigate(`/tasks/${task.id}/edit`)}
                        >
                           Edit
                        </Button>
                        <Button 
                           variant="contained"
                           color="error" 
                           onClick={() => handleDelete(task.id)} style={{
                              marginLeft: ".5rem"                   
                           }}>
                           Delete
                        </Button>                     
                     </div>
                  </CardContent>
               </Card>
            ))
         }
      
      </Fragment>
   )
}
