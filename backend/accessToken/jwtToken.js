import jwt from 'jsonwebtoken';

export const tokenGenerator = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
};