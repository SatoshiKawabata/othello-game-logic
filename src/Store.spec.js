const createStore = require("./Store");
const {Reducer} = require("./Reducer");
const ActionCreator = require("./ActionCreator");

const store = createStore(Reducer);

describe("a", () => {
  it("start game", () => {
    store.dispatch(ActionCreator.startGame());
    const state = store.getState();
    expect(state.board).toEqual([
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, -1, 0, 0, 0 ],
      [ 0, 0, 0, -1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]);
    expect(state.gameState).toEqual("black");
  });

  it("put black stone (0, 0)", () => {
    store.dispatch(ActionCreator.putStone(0, 0, "black"));
    const state = store.getState();
    expect(state.board).toEqual([
      [ -1, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, -1, 0, 0, 0 ],
      [ 0, 0, 0, -1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]);
    expect(state.gameState).toEqual("white");
  });
});
