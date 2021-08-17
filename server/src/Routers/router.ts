const Router = require('express').Router;
const router = Router();
import {register, verify, login} from '../Controllers/authController';
import {getRegions, getForumTopics} from '../Controllers/apiController';
import {protect} from '../Middleware/auth.middleware';


//public
router.post('/register', register);
router.post('/register/verify', verify);
router.post('/login', login);
router.get('/topics', getForumTopics)

//private
router.get('/regions', getRegions);

module.exports = router;