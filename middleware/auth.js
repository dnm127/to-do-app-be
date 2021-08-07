const jwt = require('jsonwebtoken');

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjI2MDI1MzM5fQ.IaUabDuGTa4f-lVi9wvR4Ojxg1208WJjPVJG-viQzpw
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded', decoded);

    next();
  } catch (error) {
    res.clearCookie('todoAppToken');
    return res.sendStatus(404);
  }
};

module.exports = {
  verifyToken,
};
