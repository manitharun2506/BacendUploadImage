import { unlink } from "fs/promises";
import USER from "../models/userModel.js";

export const UPLOAD_IMAGE = async (req, res) => {
  try {
    let user = await USER.findOne({ phoneNo: req.body.phoneNo });
    if (user) {
      user.gallery.push(req.file.filename);
      await user.save();

      res
        .status(200)
        .send({ status: true, msg: "Successfully Added Image to user" });
    } else {
      user = new USER(req.body);
      user.gallery.push(req.file.filename);
      await user.save();
      res.status(200).send({
        status: true,
        msg: "Successfully created User and  Added  Image ",
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message, data: {} });
  }
};

export const DELETE_IMAGE = async (req, res) => {
  try {
    console.log(req.body,"hihii")
    let user = await USER.findOne({ phoneNo: req.body.phoneNo });
    let Idx = user.gallery.indexOf(req.body.img);
    if (Idx === -1) {
      res
        .status(200)
        .send({ status: true, msg: "No Image Found with This Details" });
    } else {
      console.log(req.body.img);
      console.log(user.gallery);
      await unlink("./images/" + req.body.img);
      user.gallery.splice(Idx, 1)
      console.log(user.gallery);
      user.save();

      res.status(200).send({ status: true, msg: "succesfully deleted " });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message, data: {} });
  }
};

export const VIEW_ALL_IMAGES = async (req, res) => {
  try {
    let users = await USER.find();
    res
      .status(200)
      .send({ data: users, status: true, msg: "successfully fetched Data" });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message, data: {} });
  }
};
