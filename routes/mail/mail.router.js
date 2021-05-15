const express = require("express");
const router = express.Router();
const queue = require("../../services/rabbitmq");
const { validateMail } = require("./mail.validator");
router.post("/send-mail", async (req, res) => {
  const { error } = validateMail(req.body);
  queue.sendMessage("mailer", req.body);
  if (error) return res.status(400).send(error.details[0].message);
  res.status(200).send({ message: "Mail sent" });
});

module.exports = router;
