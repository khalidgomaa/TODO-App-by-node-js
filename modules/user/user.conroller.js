import userModel from "../../db/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
let jwt_secret = "this token";
const controlSign = {
  //* sign up controller function
  signUp: async (req, res) => {
    let { userName, email, password, age, gender, phone_number } = req.body;
    let token = jwt.sign(
      {
        email,
        password,
        userName
        
      },
      jwt_secret,
      { expiresIn: "24h" }
    );
    console.log(`this is : ${token}`);

    let foundeduser = await userModel.findOne({ email });
    if (foundeduser) {
      res.json({ message: "already exist" });
    } else {
      // let salt =  bcrypt.genSaltSync(10)
      let hashedPassword = bcrypt.hashSync(password, 7); // hash the password using the salt
      let savedData = await userModel.insertMany({
        userName,
        email,
        password: hashedPassword,
        age,
        gender,
        phone_number,
      });

      res.header("auth-token", token).json({ message: savedData });
    }
  },
  //* sign in controller function
  signIn: async (req, res) => {
    let { email, password } = req.body;

    let foundeduser = await userModel.findOne({ email });
    if (!foundeduser) {
      res.status(401).send("you should regist");
    } else {
      //compare passwords
      let isMatch = await bcrypt.compareSync(password, foundeduser.password);
      if (isMatch) {
        res.json({ message: "login successful" });
      } else res.status(503).send("Invalid password");
    }
  },
// function to delete
  deleteUser: async (req, res) => {
    const userName = req.params.userName;
    console.log(userName)
    const token = req.headers.authorization;

    try {
      const decoded = jwt.verify(token, jwt_secret);
      // console.log(decoded);
       const { email, password, userName } =decoded;

      const deletedUser = await userModel.deleteOne({ userName: userName });
      // console.log(deletedUser)

      if (deletedUser.deletedCount === 1) {
        res.end("deleted successfully");
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: "Unauthorized" });
    }
  },
  updateUser: async (req, res) => {
    const userName = req.params.userName;
    console.log(userName);
    const token = req.headers.authorization;

    try {
      const decoded = jwt.verify(token, jwt_secret);
      const { email, password, userName } =decoded;
      // let updatedData = {
      //   userName: req.body.userName,
      //   password: req.body.password,
      // }
      const updatedUser = await userModel.updateOne({ userName: userName }, { $set: req.body });
       console.log(updatedUser);
      if (updatedUser.modifiedCount== 1) {
        console.log("okkkkkkkkkk")
        // Check if at least one document is matched and modified
        res.json({succeded:"Updated successfully"});
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default controlSign;
