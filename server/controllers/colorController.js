const { getPool } = require('../config/database');

const getColorOfDetailMotorcycle = async (req, res) => {
    const { motorcycleId, versionId } = req.query;

    try {
        const pool = await getPool();
        const result = await pool
            .request()
            .input('maxe', motorcycleId)
            .input('maphienban', versionId)
            .execute('LayDanhSachMauSacXeTonKho'); 
        res.status(200).json({data: result.recordset}); 
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getColorOfDetailMotorcycle
};