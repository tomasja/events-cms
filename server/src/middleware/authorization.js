const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  const token = req.header('token');
  console.log(req.headers);
  if (!req.cookies.jwt && !token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(
      req.cookies.jwt || token,
      process.env.JWT_SECRET,
    );
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send('invalid token');
  }
  // const { authorization } = req.headers;
  // try {
  //   if (!authorization) return res.status(401).send('Not Allowed!');
  //   const token = authorization.split(' ')[1];
  //   const verify = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = verify.id;
  //   req.userName = verify.full_name;
  //   return next();
  // } catch (err) {
  //   return res.status(401).send('Not Allowed!');
  // }
};

module.exports = isLoggedIn;
