const {Store} = require("./src/Store");
const {Reducer} = require("./src/Reducer");
const {ActionCreator} = require("./src/ActionCreator");

module.exports = {
  createStore: () => new Store(Reducer),
  ActionCreator
};
