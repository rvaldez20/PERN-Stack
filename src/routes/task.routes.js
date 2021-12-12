const { Router } = require('express');

const router = Router();

// Obtener todas las tareas
router.get('/tasks', (req, res) => {
   res.send('Reciving a list to task');
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