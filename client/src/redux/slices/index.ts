// Use this file to export slices
export { userSlice, fetchUserInfo, fetchUserRank } from "./userSlice";
export {
  topicSlice,
  deleteForumTopic,
  createNewTopic,
  fetchForumTopics,
} from "./topicsSlice";
export { commentsSlice, fetchComments } from "./commentsSlice";
export { regionSlice, fetchRegions } from "./regionsSlice";
export { matchSlice, fetchMatches, setMatches } from './matchesSlice';
export { friendSlice, checkFriends, markSeen, clearNotifications } from './friendsSlice'
