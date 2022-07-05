import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import { findUserInfo } from "./firebase.js";
import { makeToken } from "./jwt.js";
import jwt from "jsonwebtoken";

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOption));

app.get("/", (req, res) => {
  console.log("hello");
});

app.post("/oAuth/kakao", async (req, res) => {
  try {
    const { access_token } = req.body;

    const {
      data: { kakao_account },
    } = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      method: "get",
      params: {
        secure_resource: true,
        property_key: ["kakao_account.email"],
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const result = await findUserInfo(kakao_account.email);

    const token = await makeToken(kakao_account.email);

    // 회원이 있는 경우
    if (result) {
      res.cookie("jwt_Token", token, {
        httpOnly: true,
        maxAge: 1000000,
      });
      res.send({
        result: true,
      });
    } else {
      res.send({ result: false });
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(8000, () => console.log("hello word!"));
