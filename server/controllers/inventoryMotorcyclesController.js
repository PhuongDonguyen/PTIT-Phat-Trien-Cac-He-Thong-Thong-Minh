const { getPool } = require('../config/database');

const getAllInventoryMotorcycles = async (req, res) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT * FROM XeTonKho');
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getInventoryMotorcyclesByType = async (req, res) => {
    const { maloai } = req.params; 
    console.log(maloai);

    if (!maloai) {
        return res.status(400).json({ message: 'Chưa cung cấp Mã loại xe' });
    }

    try {
        const pool = await getPool();
        const result = await pool
            .request()
            .input('maloai', maloai)
            .execute('LayXeTonKhoThuocLoai'); 

        res.status(200).json(result.recordset); // Send the results
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getDetailInventoryMotorcycle = async (req, res) => {
    const { motorcycleId, versionId, color } = req.query;

    if (!motorcycleId || !versionId) {
        return res.status(400).json({ message: 'Chưa cung cấp Mã xe hoặc mã phiên bản' });
    }

    try {
        const pool = await getPool();
        const result = await pool
            .request()
            .input('maxe', motorcycleId)
            .input('maphienban', versionId)
            .input('mamau', color || null)
            .execute('LayChiTietXeTonKho'); 

        res.status(200).json(result.recordset); // Send the results
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { getAllInventoryMotorcycles, getInventoryMotorcyclesByType, getDetailInventoryMotorcycle };