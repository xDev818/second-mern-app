const { Router } = require('express');

const { createUser, loginUser, dashboardUser, logoutUser } = require('../controllers/users_controller')

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/dashboard', dashboardUser);
router.get('/logout', logoutUser);

module.exports = router;