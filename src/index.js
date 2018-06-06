const createStore = require("./Store");
const {Reducer} = require("./Reducer");
const ActionCreator = require("./ActionCreator");

const store = createStore(Reducer);

module.exports = {
  createStore,
  Reducer,
  ActionCreator
};
