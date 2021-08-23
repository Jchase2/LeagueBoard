import { Request, Response } from "express";
import { Friend } from "../Models/friend.model";
import { Topic } from "../Models/topic.model";

export const addFriend = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid } = req.body;
    const friend = await Friend.create({
      userid: userid,
      userfriend: friendid
    });
    res.status(201)
    res.json(friend)
  } catch(err){
    next(err)
  }
}

export const removeFriend = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid } = req.body;
    const friend = await Friend.findOne({where: {userid: userid, userfriend: friendid}});
    friend?.destroy()
    res.status(204)
  } catch(err){
    next(err)
  }
}

export const addSeen = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid, friendid, topicid } = req.body;
    const friend = await Friend.findOne({where: {userid: userid, userfriend: friendid}});
    let friendArr = friend?.seenposts;
    if(friendArr === null || friendArr === undefined || friendArr.length <= 0){
      friendArr = [];
    }
    await friend?.update({ seenposts: [...friendArr, topicid] });
    res.status(201)
    res.json(friend)
  } catch(err){
    next(err)
  }
}

export const checkFriends = async (req: Request, res: Response, next: Function) => {
  try {
    let { userid } = req.headers;
    const friends: any = await Friend.findAll({where: { userid: userid }});

    // list of all friends
    let friendsList: number[] = [];
    let seenArray: number[] = [];
    friends.forEach((friend: any) => {
      friendsList.push(friend.dataValues.userfriend);
      friend.dataValues.seenposts?.forEach((val: number) => {
        seenArray.push(val);
      })
    });

    let allTopics: any[] = await Topic.findAll({});
    let allFriendsTopics: number[] = [];
    allTopics.forEach((topic: any) => {
      if(friendsList.includes(topic.userid)){
        allFriendsTopics.push(topic.id)
      }
    })
    let newFriendPosts = allFriendsTopics.filter(post => !seenArray.includes(post));
    res.status(200)
    res.json(newFriendPosts)
  } catch(err){
    next(err)
  }
}