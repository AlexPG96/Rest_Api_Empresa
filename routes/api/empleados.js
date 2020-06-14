const router = require('express').Router();
const Empleado = require('../../models/empleado');

const { check, validationResult } = require('express-validator')

// GET http://localhost:3000/api/empleados

router.get('/', async (req, res) => {
    const rows = await Empleado.getAll();
    // console.log(rows);
    res.json(rows);
})

router.post('/', [
    check('nombre', 'El nombre debe contener al menos 3 caracteres').isLength({ min: 3 }),
    check('dni', 'El DNI debe tener un formato válido').custom((value) => {
        return (/^[A-z]?\d{8}$/).test(value)
    }),
    check('sexo', 'solo se puede introducir M, F').isLength({ min: 1 }),
    check('fecha_nacimiento', 'la fecha de nacimiento debe tener un fotmato aaaa-mm-dd'),
    check('salario').isLength({ min: 5 }),
    check('cargo', 'El cargo debe tener un formato válido').isLength({ min: 3 }),
    check('jefe_id', 'Nombre del jefe de departamento').isLength({ min: 3})
    
    
    

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }

    const result = await Empleado.postEmpleado(req.body);
    if (result['affectedRows'] === 1) {
        const row = await Empleado.getById(result['insertId']);
        res.json(row);
    } else {
        res.json({ error: "El empleado no se ha dado de alta correctamente" });
    };
});


router.delete('/:empleadoId', async (req, res) => {
    const result = await Empleado.deleteId(req.params.empleadoId);

    if (result['affectedRows'] === 1) {
        res.json({ mensaje: "El empleado ha sido dado de baja" })
    } else {
        res.json({ error: "El empleado no ha podido ser dado de baja" });
    };
});


module.exports = router;