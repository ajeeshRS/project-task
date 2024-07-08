const { rateLimit } = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 3, //3 requests
  message: "Too many requests,Try again later",
});

module.exports = contactLimiter;
