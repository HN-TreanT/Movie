const reponseSuccess = ({ res }) => {
  return res.status(200).json({
    status: true,
    message: "success",
  });
};

const responseServerError = ({ res, err }) => {
  return res.status(500).json({
    status: false,
    error: err,
  });
};

const responseInValid = ({ res, message }) => {
  return res.status(422).json({
    status: 422,
    message: message,
  });
};

const responseSuccessWithData = ({ res, data }) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: data,
  });
};

module.exports = {
  reponseSuccess,
  responseInValid,
  responseServerError,
  responseSuccessWithData,
};
