const sendFailStatus = (res, code, reason) => {
  const status = "failed";

  if (reason) {
    return res.status(code).json({
      status,
      reason,
    });
  }

  return res.status(code).json({
    status,
  });
};

const sendSuccessStatus = (res, code, data, results) => {
  const status = "success";

  if (results) {
    return res.status(code).json({
      status,
      results,
      data,
    });
  }

  return res.status(code).json({
    status,
    data,
  });
};

exports.sendFailStatus = sendFailStatus;
exports.sendSuccessStatus = sendSuccessStatus;
