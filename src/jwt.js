import jwt from "jsonwebtoken";

// console.log(jwt);
export const makeToken = (email) => {
  const token = jwt.sign(
    {
      id: email,
    },
    process.env.JWT_SECRET_KEY,
    {
      subject: "bodyBuddy jwtToken",
      expiresIn: "60m",
      issuer: "bodyBuddy",
    }
  );

  return token;
};

export const verifyToken = (clientToken) => {
  try {
    const decode = jwt.verify(clientToken, process.env.JWT_SECRET_KEY);

    // 유효성 검사 통과
    if (decode) {
      const userEmail = decode.id;
      return userEmail;
    } else {
      return null;
    }
  } catch (e) {
    return false;
  }
};
