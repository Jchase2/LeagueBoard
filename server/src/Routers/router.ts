const Router = require('express').Router;
const router = Router();
import {register, verify, login, verifyEmailAndUser} from '../Controllers/authController';
import {getRegions, getRecentMatches, getForumTopics, postForumTopic, getForumTopicById, getForumComments, getUserInfo
  , deleteForumTopic, getUserRanked } from '../Controllers/apiController';
import { getAllScrimmages, getScrimmage, postScrimmage } from '../Controllers/scrimmageController'
import {protect} from '../Middleware/auth.middleware';


//public
router.post('/register', register);
router.post('/register/verify', verify);
router.get('/verify/register/user', verifyEmailAndUser);
router.post('/login', login);

//private

//TODO: change matches/:puuid to retrieve directly from db
router.get('/matches/:puuid', getRecentMatches);

router.post('/matches/update/:puuid', getRecentMatches);

router.get('/topics', getForumTopics);
router.get('/topics/comments/:parentid', getForumComments);
router.get('/topics/:topicid', getForumTopicById);
router.post('/topics', postForumTopic);
router.delete('/topics/:topicid', deleteForumTopic);

router.get('/scrimmage', getAllScrimmages);
router.get('/scrimmage/:id', getScrimmage);
router.post('/scrimmage', postScrimmage);

router.get('/regions', getRegions);

router.get('/user', getUserInfo);
router.get('/user/ranked', getUserRanked);



module.exports = router;