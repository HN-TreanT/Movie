const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActorSchema = new Schema(
  {
    actorId: { type: String, unique: true, required: true },
    photoActor: { type: String, default: null },
    name: { type: String, required: true },
  },
  { timestamps: true }
);
const Actor = mongoose.model("actors", ActorSchema);
module.exports = Actor;
