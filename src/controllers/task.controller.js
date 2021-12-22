const { request, response } = require('express');
const pool = require('../db');

/*===================================================
   Obtener todas las tareas
 ====================================================*/
const getAllTasks = async(req, res=response, next) => {   
   try {
      // throw new Error('Algo fue mal!!!') // lanzar un error propio
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
      next(error);
   } 
}


/*===================================================
   Obtener una tarea
 ====================================================*/
const getOneTask = async(req=request, res=response, next) => {
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
      next(error);
   }
}


/*===================================================
   Crear una tarea
 ====================================================*/
const createTask = async(req=request, res=response, next) => {
   const { title, description } = req.body;
   // console.log(title, description);

   try {
      const result = await pool.query('INSERT INTO task (title, description) VALUES($1,$2) RETURNING *',[title,description]);
      // console.log(result.rows[0]);

      res.json(result.rows[0]);
   } catch (error) {
      next(error);
   }
}


/*===================================================
   Eliminar una tarea
 ====================================================*/
const deleteTask = async(req, res=response, next) => {
   try {
      const { idTask } = req.params;

      // primero validamos que exista task con el id
      const result = await pool.query('SELECT * FROM task WHERE id = $1', [idTask]);

      // Si no existe task con el id se retorna message
      if(result.rows.length === 0){
         return res.status(404).json({ message: 'Task not found' });
      }

      // Delete task
      const taskDelete = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [idTask]);
      res.status(200).json(taskDelete.rows[0]);
   } catch (error) {
      next(error);
   }
}


/*===================================================
   Actualizar una tarea
 ====================================================*/
const updateTask = async(req=request, res=response, next) => {
   try {
      const { idTask } = req.params;
      const { title, description } = req.body;

      // primero validamos que exista task con el id
      const result = await pool.query('SELECT * FROM task WHERE id = $1', [idTask]);

      // Si no existe task con el id se retorna message
      if(result.rows.length === 0){
         return res.status(404).json({ message: 'Task not found' });
      }

      // Update task
      const taskUpdate = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, idTask]);
      // console.log(taskUpdate);
      res.status(200).json(taskUpdate.rows[0])

   } catch (error) {
      next(error);
   }
}


module.exports = {
   getAllTasks,
   getOneTask,
   createTask,
   updateTask,
   deleteTask
}
