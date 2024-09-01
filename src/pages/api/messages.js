// import { MongoClient } from "mongodb";

// export default async function handler(req, res) {
//   const client = await MongoClient.connect(process.env.MONGODB_URI);
//   const db = client.db();

//   const messages = await db.collection("messages").find({}).toArray();

//   client.close();

//   res.status(200).json(messages);
// }
