const router = require('express').Router();

const Empleado = require('../models/empleado');

router.get('/', (req, res) => {
    Empleado.getAll()
        .then(rows => {
            res.render('empleados/index', { empleados: rows });
        })
        .catch(err => {
            res.send(err);
        });
});

router.get('/new', (req, res) => {
    res.render('empleado/formNew');
});

router.get('/:idEmpleado', async (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.idEmpleado);
        empleado.fecha_inscripcion = moment(empleado.fecha_inscripcion).format('DD/MM/YYYY');
        res.render('empleados/detalle', { empleado });
    } catch (err) {
        res.send(err)
    }
});


router.get('/edit/:idEmpleado', (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.idEmpleado);
        empleado.fecha_nacimiento = moment(empleado.fecha_nacimiento).format('YYYY-MM-DD');
        res.render('empleados/formEdit', { empleado });
    } catch (err) {
        res.send(err);
    }
});

router.get('/delete/:idEmpleado', (req, res) => {
    Empleado.deleteById(req.params.idEmpleado)
        .then(result => {
            res.redirect('/empleados');
        })
        .catch(err => {
            res.send(err);
        });
});

router.post('/create', (req, res) => {
    try {
        const result = await Empleado.create(req.body);
        res.send('Estoy en /empleados/create');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;