const {
  reponseSuccess,
  responseInValid,
  responseServerError,
  responseSuccessWithData,
} = require("../helper/ResponseRequests");
const { v4: uuid } = require("uuid");
const Actor = require("../model/actor.model");

exports.getActor = async (req, res) => {
  try {
    const actor = await Actor.find({ actorId: req.query.actorId });
    if (actor) {
      return responseSuccessWithData({ res, data: actor });
    } else {
      return responseInValid({ res, message: "not found actor" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.addActor = async (req, res) => {
  try {
    const actorId = uuid();
    const actor = new Actor({
      ...req.body,
      actorId: actorId,
    });
    await actor.save();
    return responseSuccessWithData({ res, data: actor });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.editActor = async (req, res) => {
  try {
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.deleteActor = async (req, res) => {
  try {
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
