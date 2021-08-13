const Router = require('express').Router;
const router = Router();
const {register, login} = require('../controllers/auth');
const {protect} = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);

router.post('/protectedXdXd', protect, login);


module.exports = router;