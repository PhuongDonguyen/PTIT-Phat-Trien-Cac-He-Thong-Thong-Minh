const { getPool } = require('../config/database');

const getAllMotorcycleTypes= async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT * FROM Loai');
        res.status(200).json({data: result.recordset});
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getMotorcycleTypeById = async (req, res) => { 
    const { typeId } = req.params; 

    if (!typeId) {
        return res.status(400).json({ message: 'Chưa cung cấp Mã loại xe' });
    }

    try {
        const pool = await getPool();
        const result = await pool.request().query(`SELECT * FROM Loai WHERE MaLoai = '${typeId}';`);

        res.status(200).json({data: result.recordset[0]});
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { getAllMotorcycleTypes, getMotorcycleTypeById };