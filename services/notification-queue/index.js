const {
  updateArtists,
  createResponseObject,
} = require('@spotify-notification-bot/helpers');

module.exports.updater = async () => {
  try {
    console.log('lambda was invoked');
    return await updateArtists();
  } catch (e) {
    console.log(e.message);
    return createResponseObject(200, e.message);
  }
};
