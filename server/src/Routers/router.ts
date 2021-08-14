const Router = require('express').Router;
const router = Router();
import {register, verify, login} from '../Controllers/authController';
import {getRegions} from '../Controllers/apiController';
import {protect} from '../Middleware/auth.middleware';


//public
router.post('/register', register);
router.post('/register/verify', verify);
router.post('/login', login);


//private
router.get('/regions', getRegions);

module.exports = router;