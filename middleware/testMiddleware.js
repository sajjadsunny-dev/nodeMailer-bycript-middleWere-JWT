const jwt = require('jsonwebtoken');
const UserList = require('../model/userSchema')

async function testMiddleware(req, res, next) {
   try {
      const token = req.headers.authorization;
      if (!token) {
         return res.json('authorization failed!');
      }
      const decoded = jwt.verify(token, 'sunny');
      const user = await UserList.findOne({ email: decoded.id });
      if (user) {
         next()
      } else {
         res.json('authorization failed!')
      }
   } catch (error) {
      res.json('authorization failed!');
   }
}
module.exports = testMiddleware