const Router = require('express').Router;
const router = Router();
import {register, verify, login} from '../Controllers/authController';
import {getRegions, getRecentMatches, getForumTopics, postForumTopic, getForumTopicById, getForumComments} from '../Controllers/apiController';
import {protect} from '../Middleware/auth.middleware';


//public
router.post('/register', register);
router.post('/register/verify', verify);
router.post('/login', login);
router.post('/topics', postForumTopic)
router.get('/topics', getForumTopics)
router.get('/topics/comments/:parentid', getForumComments)
router.get('/topics/:topicid', getForumTopicById)


//private
router.get('/regions', getRegions);
router.get('/matches/:puuid', getRecentMatches);

module.exports = router;