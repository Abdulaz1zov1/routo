const { isValidObjectId } = require("mongoose");
const Like = require("../models/like");

exports.add = async (req, res, next) => {
  try {
    // const like1 = new Like({...req.body});
    // res.status(201).json({
    //   success: true,
    //   status: 201,
    //   data: like1,
    // });
    const like = await Like.find(req.body);
    // console.log(like)
    // throw new Error("ASD")
    const a = like.filter(
      (e) =>e.likes.toString()===req.body.likes&&e.userId.toString()===req.body.userId
    //     console.log(e.userId.toString(),req.body.likes)
    //     if  (e.likes===req.body.likes||){
    //      console.log(e.likes,req.body.likes);   
    //     }
    //   }
    );
    console.log(a)
    // console.log(like.)
    if (a.length===0) {
      const like1 = await Like.create({...req.body});
      res.status(201).json({
        success: true,
        status: 201,
        data: like1,
      });
    } else {
      res.status(201).json({
        success: true,
        status: 201,
        data: a[0],
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
};

exports.one = async (req, res, next) => {
  try {
    const getId = await Like.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      status: 200,
      data: getId,
    });
  } catch (err) {
    res.status(404).json({
      message: "like not found",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const condition = { userId: req.query.userId };
    !condition.userId && delete condition.userId;
    const car = await Like.find(condition)
      .populate(["likes", "userId"])
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Like.count();
    res.status(200).json({
      pagination: {
        totol: Math.round(count / limit),
        page: +page,
        limit: +limit,
      },
      car,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: "error",
    });
  }
};

exports.byUserId = async (req, res) => {
  try {
    const getAllLike = await Like.find({ userId: req.params.id })
      .sort({ date: -1 })
      .populate(["likes", "userId"]);
    res.status(200).json({
      message: "success",
      data: getAllLike,
    });
  } catch (err) {
    res.status(404).json({
      message: "like not found",
    });
  }
};

exports.delet = async (req, res, next) => {
  try {
    await Like.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      success: true,
      status: 200,
      data: [],
    });
  } catch (err) {
    res.status(404).json({
      message: "like not found",
    });
  }
};
