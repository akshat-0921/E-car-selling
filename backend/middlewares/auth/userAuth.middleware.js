import jwt from "jsonwebtoken"

export const userAuth = async (req, res, next) => {
   try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

      if (!token) { return res.status(401).json({ success: false, msg: 'Token required to access' }) }

      const decodedToken = jwt.verify(token, env.SECRET_ACCESS_TOKEN)

      if (!decodedToken) { return res.status(400).json({ success: false, msg: 'Invalid token' }) }

      req.userId = decodedToken._id
      next()
   } catch (error) {
      console.log(error)
      return res.status(500).json('Jwt could not be verified')
   }
}
