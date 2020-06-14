const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamentos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into departamentos (nombre, ciudad) values (?, ?)',
            [nombre, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
}


const editDepartamento = ({ ciudad }, id) => {
    return new Promise((resolve, reject) => {
        db.query('update departamentos set ciudad = ? where id = ?', [ciudad, id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const deleteDepartamento = (id) => {
    return new Promise((resolve, reject) => {
        db.query('delete from departamentos where id = ?', [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}


module.exports = {
    getAll,
    create,
    editDepartamento,
    deleteDepartamento
}