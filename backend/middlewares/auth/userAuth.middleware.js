import jwt from "jsonwebtoken"
import { User } from "../../models/user.models.js";

export const userAuth = async (req, res, next) => {
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      // if (token) console.log("Token:", token);

      if (!token) { return res.status(401).json({ success: false, msg: 'Token required to access' }) }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      if (!decodedToken) { return res.status(400).json({ success: false, msg: 'Invalid token' }) }

      req.userId = decodedToken._id
      req.user = await User.findById(req.userId)
      console.log(req.user)
      next()
   } catch (error) {
      console.log(error)
      return res.status(500).json('Jwt could not be verified')
   }
}
