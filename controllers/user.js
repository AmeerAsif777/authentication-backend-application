import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import ModelSchemaOfUser from "../models/user.js";
const secret = "test";



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await ModelSchemaOfUser.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "Entered mail is not exist in our database" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

    try {
      // Here, we can check if the user is already existing in the database
    const oldUser = await ModelSchemaOfUser.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // if not, then creating password with decrypting
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await ModelSchemaOfUser.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    
      expiresIn: "24h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const update = async (req,res) => {
  const user = await ModelSchemaOfUser.findOne({email:req.body.email})


  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
       user.password = await bcrypt.hash(req.body.password,12);
    }
    if (req.body.profile_pic){
      user.profile_pic = req.body.profile_pic;
    }

    const updateUser = await user.save();

    res.json(
      {
        name : updateUser.name,
        email : updateUser.email,
        password : updateUser.password,
        //profile_pic : updateUser.profile_pic,
        //id : updateUser.id,

      }
    );
  }

  else  {
    res.status(500).json({ message: "User not found"});
  }
}





