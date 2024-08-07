const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connection");
const cors = require("cors");
const user = require("./models/userContactModel");
const query = require("./models/messageModel");
const sendConfirmationMail = require("./utils/utils");
const contactLimiter = require("./middlewares/rateLimit");
dotenv.config();

const app = express();
const port = 5000;

// app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({ origin: "https://to-let-contact-us.netlify.app" }));

app.post("/contact-form", contactLimiter, async (req, res) => {
  try {
    const { email, name, topic, message } = req.body;

    if (!email || !message) {
      return res.status(403).json("Email and message are required");
    }

    // check for user,if user exist return existing user else create a new user
    const userResult = await user.findOneAndUpdate(
      { email: email },
      { $setOnInsert: { email }, $set: { name: name ? name : "" } },
      { new: true, upsert: true }
    );

    await query.create({
      user: userResult._id,
      topic,
      message,
    });

    sendConfirmationMail(email);

    res.status(201).json("Form submission successful");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

connectDb(() => {
  app.listen(port, () => {
    console.log(`server running on : ${port}`);
  });
});
