import express from 'express';
import { getConfig, updateConfig } from '../controllers/config.controller.js';
import { verifyToken } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';

const router = express.Router();

// Public hoặc Member/PT đều có thể xem quy định
router.get('/:key', getConfig);
router.get('/', verifyToken, requireRole('admin'), getConfig);

// Chỉ Admin mới được sửa
router.put('/:key', verifyToken, requireRole('admin'), updateConfig);

export default router;
