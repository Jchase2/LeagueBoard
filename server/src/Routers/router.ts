const Router = require('express').Router;
const router = Router();
import {register, verify, login, verifyEmailAndUser} from '../Controllers/authController';
<<<<<<< HEAD
import {getRegions, getRecentMatches, getForumTopics, postForumTopic, getForumTopicById, getForumComments, getUserInfo } from '../Controllers/apiController';
=======
import {getRegions, getRecentMatches, getForumTopics, postForumTopic } from '../Controllers/apiController';
>>>>>>> sarah/redux
import {protect} from '../Middleware/auth.middleware';


//public
router.post('/register', register);
router.post('/register/verify', verify);
router.get('/verify/register/user', verifyEmailAndUser);
router.post('/login', login);

router.post('/topics', postForumTopic)
router.get('/topics', getForumTopics)
<<<<<<< HEAD
router.get('/topics/comments/:parentid', getForumComments)
router.get('/topics/:topicid', getForumTopicById)
=======
//router.get('/topics/:topicid', getForumTopicById)
>>>>>>> sarah/redux


//private
router.get('/regions', getRegions);
router.get('/matches/:puuid', getRecentMatches);
router.get('/user', getUserInfo);

module.exports = router;