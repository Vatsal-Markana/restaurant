require("dotenv").config();
const STATUS_SUCCESS = 1;
const STATUS_ERROR = 0;

const ok = (resp, data, description = "", status = STATUS_SUCCESS) => {
  resp.status(200).json({
    status: status,
    description: description ? description : "",
    data: data,
  });
};

const error = (resp, description, status = STATUS_ERROR) => {
  resp.status(200).json({
    status: status,
    description: description ? description : "",
    data: [],
  });
};
const invalidToken = (resp, description = "", status = STATUS_SUCCESS) => {
  resp.status(403).json({
    status: status,
    description: description ? description : "",
  });
};

const serviceToController = (status, data, description) => {
  return {
    status: status,
    data: data,
    description: description ? description : "",
  };
};

module.exports = {
  ok,
  error,
  STATUS_SUCCESS,
  STATUS_ERROR,
  invalidToken,
  serviceToController,
};
