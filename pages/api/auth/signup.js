import getClient from "../../../lib/db/db";
import { hashPassword } from "../../../lib/hashing";
import User from "../../../lib/db/models/User";

async function signup(req, res) {
  if (req.method === "POST") {
    console.log("in signup post");
    try {
        await getClient();
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Could not connect to dtatbase",
        });
        return;
    }

    const { email, username, password } = req.body;

    const verifyDetails = checkCredentials(email, password);

    const checkDup = await checkDuplicatedEmails(email);

    if (!verifyDetails || checkDup) {
      res.status(422).json({
        message: "Inputs are invalids or email in use",
      });
      console.log(`!verify || checkDups`);
      return;
    }
    const hashedPw = await hashPassword(password);
    let vals = {
      email,
      password: hashedPw,
      username,
    }

    try {
      let user = new User(vals);
      user.save();

      res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      res.status(500).json({ message: "Could not register you" });
      console.log(error);
    }
    console.log("left signup post");
  }
}

function checkCredentials(email, password) {
  if (!email || !email.includes("@") || !password) {
    return false;
  }
  return true;
}

async function checkDuplicatedEmails(email) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export default signup;
