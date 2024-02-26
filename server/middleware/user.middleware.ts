import { Request, Response } from "express";
import { error } from "../utils/response";
import userModel from "../models/user.model";
const jwt = require("jsonwebtoken");


const userAuth = async (req: Request, res: Response, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).send(error(400, "Authorization token Required"));
  }
  const token = authorization.split(" ")[1];
  try {
    const _id = jwt.verify(token, process.env.SECRET);

    const temp = await userModel.findOne({ _id }).select("_id");

    if (temp && temp._id) {
      let userId = temp._id.toString();
      req.body.userId = userId;
    }

    next();
  } catch (err: any) {
    console.log(err);
    return res.status(401).send(error(401, "Authorization token is not authorized"));

  }
};

export { userAuth };