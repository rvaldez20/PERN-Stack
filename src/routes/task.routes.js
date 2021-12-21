const { Router } = require('express');

const { 
   getAllTasks, 
   getOneTask, 
   createTask, 
   updateTask,
   deleteTask
} = require('../controllers/task.controller');

const router = Router();

// Obtener todas las tareas
router.get('/tasks', getAllTasks);

// obteneiendo una tarea
router.get('/tasks/:idTask', getOneTask);

// Creando una tarea
router.post('/tasks', createTask);

// Eliminando una tarea
router.delete('/tasks', deleteTask);

// Actualizando una tarea
router.put('/tasks', updateTask);

module.exports = router;