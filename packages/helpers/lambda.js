const createResponseObject = async (statusCode, status) => {
  return {
    statusCode,
    body: JSON.stringify({ status }, null, 2),
  }
};

module.exports = {
  createResponseObject,
};
