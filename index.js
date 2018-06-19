const {Store} = require("./src/Store");
const Reducers = require("./src/Reducers");
const {ActionCreator} = require("./src/ActionCreator");

module.exports = {
  createStore: () => new Store(Reducers.Reducer),
  ActionCreator,
  Reducers
};
