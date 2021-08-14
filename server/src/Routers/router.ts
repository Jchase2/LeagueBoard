const Router = require('express').Router;
const router = Router();
const {register, login} = require('../Controllers/authController');
const {protect} = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);

router.post('/protected', protect, login);


module.exports = router;