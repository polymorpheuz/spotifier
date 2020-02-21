const AWS = require('aws-sdk');
const dynamoDBClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });

const { playlistsTable } = require('../tables');

const get = (playlistId, chatId) => dynamoDBClient.get({
  TableName: playlistSubscribersTable,
  Key: {
    playlistId,
    ...(chatId ? { chatId } : {}),
  },
}).promise().then(result => result.Item);

const getAllPlaylistEntries = (playlistId) => dynamoDBClient.query({
  TableName: playlistSubscribersTable,
  KeyConditionExpression: "playlistId = :pid",
  ExpressionAttributeValues: {
    ":pid": playlistId
  }
}).promise().then(result => result.Items);

const set = item => dynamoDBClient.put({
  TableName: playlistSubscribersTable,
  Item: item,
}).promise();

const remove = (playlistId, chatId) => dynamoDBClient.delete({
  TableName: playlistSubscribersTable,
  Key: { playlistId, chatId },
}).promise();

module.exports = {
  get,
  getAllPlaylistEntries,
  set,
  remove,
};
