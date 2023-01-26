import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const expiresIn = 60 * 10;

  try {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
