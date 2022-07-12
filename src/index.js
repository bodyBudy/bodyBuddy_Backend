import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

import { findUserInfo } from "./firebase.js";
import { makeToken } from "./jwt.js";

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOption));

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

    const {
      email,
      profile: { nickname },
      gender,
    } = kakao_account;

    const result = await findUserInfo(email);
    const token = await makeToken(email);

    // 회원이 있는 경우
    if (result) {
      res.cookie("jwt_Token", token);
      res.send({
        result: true,
      });
    } else {
      res.send({
        result: false,
        userInfo: {
          email: email,
          nickname: nickname,
          gender: gender,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(8000, () => console.log("hello word!"));
