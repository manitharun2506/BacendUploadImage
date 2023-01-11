import { Router } from "express";
import {
  DELETE_IMAGE,
  UPLOAD_IMAGE,
  VIEW_ALL_IMAGES,
} from "../controllers/userControllers.js";

import multer from "multer";

const STORAGE = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
    //saving Images as a file  as filename
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const UPLOAD = multer({ storage: STORAGE });

const UserRouter = Router();

UserRouter.post("/", UPLOAD.single("photo"), UPLOAD_IMAGE);

UserRouter.get("/", VIEW_ALL_IMAGES);

UserRouter.put("/", DELETE_IMAGE);

export default UserRouter;
