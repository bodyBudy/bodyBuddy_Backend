import jwt from "jsonwebtoken";

// console.log(jwt);
export const makeToken = async (email) => {
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
