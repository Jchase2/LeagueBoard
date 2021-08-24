const Router = require("express").Router;
const router = Router();
import {
  register,
  verify,
  login,
  verifyEmailAndUser,
} from "../Controllers/authController";
import {
  getRegions,
  updateMatchesInDb,
  getMatches,
  getUserInfo,
  getUserRanked,
  getSummoner,
} from "../Controllers/apiController";
import {
  checkFriends,
  clearNotifications,
  addFriend,
  removeFriend,
  addSeen
} from "../Controllers/friendsController";

import {
  getForumTopics,
  postForumTopic,
  getForumTopicById,
  getForumComments,
  getForumOwner,
  closeForumTopic,
  voteTopic,
  getVote,
  getVoteCount,
  deleteForumTopic,
  getParentId,
} from "../Controllers/forumsController";
import {
  getAllScrimmages,
  getScrimmage,
  postScrimmage,
} from "../Controllers/scrimmageController";
import { protect } from "../Middleware/auth.middleware";

//public
router.post("/register", register);
router.post("/register/verify", verify);
router.get("/verify/register/user", verifyEmailAndUser);
router.post("/login", login);

//private

//TODO: change matches/:puuid to retrieve directly from db
router.post("/summoner", getSummoner);
router.get("/matches/:puuid", getMatches);
router.post("/matches/update/:puuid", updateMatchesInDb);

// FORUMS
router.get("/topics", getForumTopics);
router.get("/topics/comments/:parentid", getForumComments);
router.get("/topics/grandparent/:id", getParentId);
router.get("/topics/user/:topicid", getForumOwner);
router.get("/topics/:topicid", getForumTopicById);
router.put("/vote", voteTopic);
router.get("/vote/:id", getVote);
router.get("/votescore/:id", getVoteCount);
router.post("/topics", postForumTopic);
router.delete("/topics/:topicid", deleteForumTopic);
router.put("/topics/close/:topicid", closeForumTopic);

// SCRIMMAGE
router.get("/scrimmage", getAllScrimmages);
router.get("/scrimmage/:id", getScrimmage);
router.post("/scrimmage", postScrimmage);

router.post("/friend/create", addFriend);
router.delete("/friend/remove", removeFriend)
router.delete("/friend/clear", clearNotifications);
router.put("/friend/seen", addSeen);
router.get("/friend/check", checkFriends);

router.get("/regions", getRegions);

router.get("/user", getUserInfo);
router.get("/user/ranked", getUserRanked);

router.get("/user");

module.exports = router;
