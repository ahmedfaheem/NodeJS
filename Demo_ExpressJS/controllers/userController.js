

class UserController {
  
   index(req, res) {
   return res.json({ message: "Hello World" });
    
   }
}


module.exports = { UserController }