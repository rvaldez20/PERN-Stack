const { request, response } = require('express');
const pool = require('../db');

/*===================================================
   Obtener todas las tareas
 ====================================================*/
const getAllTasks = async(req, res=response) => {   
   try {
      const result = await pool.query('SELECT * FROM task');
      // console.log(result.rowCount);

      if(result.rows.length === 0){
         return res.json({
            count: 0,
            tasks: result.rows
         });
      }

      res.json({
         count: result.rowCount,
         tasks:result.rows 
      })

   } catch (error) {
      res.json({error: error})
   } 
}


/*===================================================
   Obtener una tarea
 ====================================================*/
const getOneTask = async(req=request, res=response) => {
   try {
      const {idTask} = req.params;
      // console.log(idTask);

      // verificamos que existe
      const result = await pool.query('SELECT *  FROM task WHERE id = $1', [idTask]);
      if(result.rows.length === 0) {
         return res.status(404).json({ message: 'Task not found' });
      }

      res.json(result.rows[0]);
      
   } catch (error) {
      res.json({error: error})
   }
}


/*===================================================
   Crear una tarea
 ====================================================*/
const createTask = async(req=request, res=response) => {
   const { title, description } = req.body;
   // console.log(title, description);

   try {
      const result = await pool.query('INSERT INTO task (title, description) VALUES($1,$2) RETURNING *',[title,description]);
      // console.log(result.rows[0]);

      res.json(result.rows[0]);
   } catch (error) {
      res.json({error: error.message})
   }
}


/*===================================================
   Eliminar una tarea
 ====================================================*/
const deleteTask = async(req, res) => {
   try {
      const { idTask } = req.params;

      // primero validamos que exista task con el id
      const result = await pool.query('SELECT * FROM task WHERE id = $1', [idTask]);

      if(result.rows.length === 0){
         return res.status(404).json({ message: 'Task not found' });
      }

      const taskDelete = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [idTask]);
      res.status(200).json( taskDelete.rows[0] );
   } catch (error) {
      res.json({error: error.message});
   }
}


/*===================================================
   Actualizar una tarea
 ====================================================*/
const updateTask = (req, res) => {
   res.send('Actualizando a list to task');
}


module.exports = {
   getAllTasks,
   getOneTask,
   createTask,
   updateTask,
   deleteTask
}
