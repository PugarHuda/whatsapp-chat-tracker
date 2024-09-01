import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  from: String,
  body: String,
  timestamp: Date,
});

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default MessageModel;
