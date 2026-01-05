import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        // Accept Authorization: Bearer <token> or token header
        const headerAuth = req.headers['authorization'] || (req.header && req.header('Authorization'));
        const rawToken = headerAuth ? String(headerAuth).replace(/^\s*bearer\s+/i, '').trim() : (req.headers['token'] || req.headers['x-auth-token'] || null);

        if (!rawToken) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        let decoded;
        try {
            decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        // Admin token may be a plain string payload (legacy); normalize check
        const expected = String(process.env.ADMIN_EMAIL || '') + String(process.env.ADMIN_PASSWORD || '');
        if (decoded !== expected && !(decoded && decoded.email === process.env.ADMIN_EMAIL)) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Not Authorized" })
    }
}
export default adminAuth