const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}

const getPool = () => {
    return sql.connect(config)
        .then(pool => {
            console.log('Connected to SQL Server');
            return pool;
        })
        .catch(err => {
            console.log('Database Connection Failed! Bad Config: ', err);
            throw err;
        })
}

module.exports = { sql, getPool };