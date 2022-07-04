import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  Credential: true,
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

    const result = await axios({
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

    console.log(result);
  } catch (e) {
    console.log(e);
  }
});

app.listen(8000, () => console.log("hello word!"));
