const router = require('express').Router();

const Departamento = require('../../models/departamento');

//GET hhtp://localhost:3000/api/departamentos
router.get('/', async (req, res) => {
    const rows = await Departamento.getAll();
    res.json(rows);
});

// POST http://localhost:3000/api/departamentos
router.post('/', async (req, res) => {
    const result = await Departamento.create(req.body);
    res.json(result);
});

//PUT http://localhost:3000/api/Departamentos/:pDepartamentoId
router.put('/:pDepartamentoId', async (req, res) => {
    const result = await Departamento.updateById(req.body, req.params.pDepartamentoId);
    res.json(result)
});

// DELETE http://localhost:3000/api/departamentos
router.delete('/', async (req, res) => {
    const result = await Departamento.deleteById(req.body.id);
    res.json(result);
});

module.exports = router;