const queries = require('../queries');

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getAllV2 = () => {
    return new Promise((resolve, reject) => {
        db.query(queries.selectAll, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
};

const create = ({ nombre, dni, sexo, fecha_nac, salario, cargo, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into empleados (nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, jefe_id) values (?, ? ,? ,?, ?, ?, ?, ?)',
            [nombre, dni, sexo, fecha_nac, new Date(), salario, cargo, jefe_id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};


const editEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        db.query('update empleados where id = ?', [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const deleteEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id = ?', [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id no existe');
                resolve(rows[0]);
        })
    });
};


module.exports = {
    getAll,
    getAllV2,
    create,
    deleteEmpleado,
    editEmpleado,
    getById
}