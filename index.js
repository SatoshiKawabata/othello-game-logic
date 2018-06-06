const createStore = require("./src/Store");
const {Reducer} = require("./src/Reducer");
const ActionCreator = require("./src/ActionCreator");

const store = createStore(Reducer);

module.exports = {
  createStore,
  Reducer,
  ActionCreator
};
