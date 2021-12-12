const { Router } = require('express');
const pool = require('../db');

const router = Router();

// Obtener todas las tareas
router.get('/tasks', async(req, res) => {
   const result = await pool.query('SELECT NOW();');
   console.log(result);

   res.json({result: result.rows[0]})
});

// obteneiendo una tarea
router.get('/tasks/10', (req, res) => {
   res.send('Reciving a single task');
});

// Creando una tarea
router.post('/tasks', (req, res) => {
   res.send('Creating a list to task');
});

// Eliminando una tarea
router.delete('/tasks', (req, res) => {
   res.send('Deleting a list to task');
});

// Actualizando una tarea
router.put('/tasks', (req, res) => {
   res.send('Actualizando a list to task');
});

module.exports = router;