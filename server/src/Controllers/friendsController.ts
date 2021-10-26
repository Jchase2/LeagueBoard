import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Friend } from "../Models/friend.model";
import { Topic } from "../Models/topic.model";
import { User } from "../Models/user.model";

export const addFriend = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid, friendid } = req.body;
    const friend = await Friend.create({
      userid: userid,
      userfriend: friendid,
    });
    res.status(201);
    res.json(friend);
  } catch (err) {
    next(err);
  }
};

export const removeFriend = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid, friendid } = req.body.data;
    const friend = await Friend.findOne({
      where: { userid: userid, userfriend: friendid },
    });
    friend?.destroy();
    res.status(204);
  } catch (err) {
    next(err);
  }
};

export const addSeen = async (req: Request, res: Response, next: Function) => {
  try {
    const { userid, friendid, topicid } = req.body;
    const friend = await Friend.findOne({
      where: { userid: userid, userfriend: friendid },
    });
    const friendArr = friend?.seenposts || [];

    await friend?.update({ seenposts: [...friendArr, topicid] });
    res.status(201);
    res.json(friend);
  } catch (err) {
    next(err);
  }
};

export const friendSeen = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid, friendid } = req.body;
    // This call comes from the friend, so these get reversed
    const friend = await Friend.findOne({
      where: { userid: friendid, userfriend: userid },
    });
    await friend?.update({ seen: true });
    res.status(201);
    res.json(friend);
  } catch (err) {
    next(err);
  }
};

export const checkAddedBy = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const { userid } = req.headers;

  try {
    const friends: any = await Friend.findAll({});
    const addedMe: number[] = [];
    friends.forEach((friend: any) => {
      if (
        friend.dataValues.userfriend === Number(userid) &&
        !friend.dataValues.seen
      ) {
        addedMe.push(friend.dataValues.userid);
      }
    });
    res.json(addedMe);
  } catch (err) {
    next(err);
  }
};

export const checkFriends = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid } = req.headers;
    const friends: any = await Friend.findAll({ where: { userid: userid } });

    // list of all friends
    const friendsList: number[] = [];
    const seenArray: number[] = [];
    friends.forEach((friend: any) => {
      friendsList.push(friend.dataValues.userfriend);
      friend.dataValues.seenposts?.forEach((val: number) => {
        seenArray.push(val);
      });
    });

    const allTopics: any[] = await Topic.findAll({});
    const allFriendsTopics: any[] = [];
    allTopics.forEach((topic: any) => {
      if (friendsList.includes(topic.userid)) {
        allFriendsTopics.push(topic);
      }
    });
    const allFriendsTopicsId: number[] = [];
    allFriendsTopics.sort(
      (a, b) => b.dataValues.created_at - a.dataValues.created_at
    );
    allFriendsTopics.forEach((topic: any) => {
      if (friendsList.includes(topic.userid)) {
        allFriendsTopicsId.push(topic.id);
      }
    });
    let newFriendPosts = allFriendsTopicsId.filter(
      (post) => !seenArray.includes(post)
    );
    res.status(200);
    // Return last 3 posts
    newFriendPosts = newFriendPosts.slice(0, 3);
    res.json(newFriendPosts);
  } catch (err) {
    next(err);
  }
};

export const clearNotifications = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid } = req.body;
    const friends: any = await Friend.findAll({ where: { userid: userid } });

    Friend.update({ seen: true }, { where: { userfriend: userid } });

    // list of all friends
    const friendsList: number[] = [];
    friends.forEach((friend: any) => {
      friendsList.push(friend.dataValues.userfriend);
    });

    // For each friend in friends list, add list of topics by that frined friend
    // to seenposts.
    friendsList.forEach(async (friend) => {
      const friendObject = await Friend.findOne({
        where: { userfriend: friend },
      });
      const friendTopics = await Topic.findAll({ where: { userid: friend } });
      let seent = friendObject?.seenposts || [];
      if (friendObject && !friendObject.seenposts) {
        friendObject.seenposts = [];
      }
      friendTopics.forEach((friendTopic) => {
        friendObject?.update({
          seenposts: [...friendObject.seenposts, friendTopic.id],
        });
      });
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export const getUserNameById = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid } = req.headers;
    // This call comes from the friend, so these get reversed
    const user = await User.findOne({ where: { id: userid } });
    res.status(200);
    res.json({ summoner_name: user?.summoner_name, userid: user?.id });
  } catch (err) {
    next(err);
  }
};

export const getUserBySummonerName = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    let { summoner_name } = req.headers;
    const user = await User.findOne({
      where: { summoner_name: { [Op.iLike]: summoner_name } },
    });
    res.status(200);
    res.json({ summoner_name: user?.summoner_name, userid: user?.id });
  } catch (err) {
    next(err);
  }
};

export const amFollowing = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const { userid, friendid } = req.headers;
    const user = await Friend.findOne({
      where: { userfriend: friendid, userid: userid },
    });
    if (user) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    next(err);
  }
};
