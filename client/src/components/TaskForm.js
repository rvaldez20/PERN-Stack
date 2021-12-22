import {
   Button, 
   Card, 
   CardContent, 
   CircularProgress, 
   Grid, 
   TextField, 
   Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function TaskForm() {

   // Se define el estado
   const [task, setTask] = useState({
      title: '',
      description: ''
   });
   const [loading, setLoading] = useState(false);

   // se inicializa Navigate
   const navigate = useNavigate();

   // para el envio de datos del formulario (submit)
   const handleSubmit = async(e) => {
      e.preventDefault();
      // console.log(task);

      //Se activa el loading a true
      setLoading(true);

      //se envian los datos al backend por medio d ela API Rest
      // la task se envia en formato de texto por eso JSON.stringify(task)
      const res = await fetch('http://localhost:4000/tasks', {
         method: 'POST',
         body: JSON.stringify(task),
         headers: {
            'Content-Type': 'application/json'
         }     
      })
      const data = await res.json();
      // console.log(data);

      //Se apaga el loading a false
      setLoading(false);

      // una vez que guarda se redirecciona
      navigate('/');

   }

   const handleChange = (e) => {
      // console.log(e.target.name, e.target.value);
      setTask({...task, [e.target.name]: e.target.value});
   }


   return (
      <Grid 
         container
         dierction='column'
         alignItems='center'
         justifyContent='center'
      >
         <Grid item xs={4}>
            <Card 
               sx={{mt: 5}}
               style={{
                  backgroundColor: '#1e272e',
                  padding: '1rem'
               }}
            >
               <Typography
                  variant='5'
                  textAlign='center'
                  color='#fff'
               >
                  Create Task</Typography>
               <CardContent>
                  <form 
                     onSubmit={handleSubmit}
                  >
                     <TextField 
                        variant='filled'
                        label='Write your title'
                        sx={{
                           display: 'block',
                           margin: '.5rem 0'
                        }}
                        name='title'
                        onChange={handleChange}
                        inputProps={{style: {color: "#fff"}}}
                        InputLabelProps={{style: {color: "#1565C0"}}}
                     />

                     <TextField 
                        variant='filled'
                        label='Write your description'
                        multiline
                        rows={4}
                        sx={{
                           display: 'block',
                           margin: '.5rem 0'
                        }}
                        name='description'
                        onChange={handleChange}
                        inputProps={{style: {color: "#fff"}}}
                        InputLabelProps={{style: {color: "#1565C0"}}}
                     />

                     <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={!task.title || !task.description}
                     >
                        {loading ? (
                              <CircularProgress 
                                 color='inherit'
                                 size={24}
                              /> 
                              ) : (
                                 "Create"
                              )
                        }
                     </Button>

                  </form>
               </CardContent>
            </Card>
         </Grid>
      </Grid>
   )
}
