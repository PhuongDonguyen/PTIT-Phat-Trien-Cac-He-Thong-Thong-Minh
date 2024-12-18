const { getPool } = require('../config/database');

const getAllInventoryMotorcycles = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const offset = (pageNumber - 1) * pageSize;

    try {
        const pool = await getPool();

        const result = await pool.request().query(`
        SELECT 
            XeTonKho.MaXe,
            XeTonKho.MaPhienBan,
            XeTonKho.SoLuong,
            TenXe = XeMay.TenXe + ' ' + PhienBan.TenPhienBan,
            XeMay.MaLoai,
            GiaTieuChuan = FORMAT(MIN(XeTonKho.GiaXe), 'N0') + N'đ',
            XeMay.Image AS Anh
            FROM XeTonKho 
            INNER JOIN XeMay ON XeTonKho.MaXe = XeMay.MaXe 
            INNER JOIN PhienBan ON XeTonKho.MaPhienBan = PhienBan.MaPhienBan
            GROUP BY 
                XeTonKho.MaXe, 
                XeTonKho.MaPhienBan, 
                XeTonKho.SoLuong, 
                XeMay.TenXe, 
                PhienBan.TenPhienBan, 
                XeMay.MaLoai, 
                XeMay.Image
            ORDER BY XeTonKho.MaXe 
            OFFSET ${offset} ROWS 
            FETCH NEXT ${pageSize} ROWS ONLY
        `);



        const totalResult = await pool.request().query('SELECT COUNT(*) AS total FROM XeTonKho');
        const totalRecords = totalResult.recordset[0].total;
        const totalPages = Math.ceil(totalRecords / pageSize);

        res.status(200).json({
            data: result.recordset,
            pagination: {
                totalRecords,
                totalPages
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const getInventoryMotorcyclesByType = async (req, res) => {
    const { maloai } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!maloai) {
        return res.status(400).json({ message: 'Chưa cung cấp Mã loại xe' });
    }

    try {
        const pool = await getPool();
        const result = await pool
            .request()
            .input('maloai', maloai)
            .input('page', parseInt(page))
            .input('limit', parseInt(limit))
            .execute('LayXeTonKhoThuocLoai');

        const totalItems = result.recordsets[0][0]?.TotalItems || 0;
        const motorcycles = result.recordsets[1] || [];

        res.status(200).json({
            data: motorcycles,
            pagination: {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: parseInt(page),
                pageSize: parseInt(limit)
            }
        });
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

        res.status(200).json({ data: result.recordset }); // Send the results
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = { getAllInventoryMotorcycles, getInventoryMotorcyclesByType, getDetailInventoryMotorcycle };