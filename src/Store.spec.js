const {Store} = require("./Store");
const {Reducer} = require("./Reducer");
const {ActionCreator} = require("./ActionCreator");

describe("Store test", () => {
  const store = new Store(Reducer);
  it("start game", () => {
    store.dispatch(ActionCreator.startGame());
    expect(store.getState().board).toEqual([
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, -1, 0, 0, 0 ],
      [ 0, 0, 0, -1, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ]
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (3, 2)", () => {
    store.dispatch(ActionCreator.putStone(3, 2, "black"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1, -1,  0,  0,  0 ],
      [ 0,  0,  0, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (2, 4)", () => {
    store.dispatch(ActionCreator.putStone(2, 4, "white"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1, -1,  0,  0,  0 ],
      [ 0,  0,  1,  1,  1,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (3, 5)", () => {
    store.dispatch(ActionCreator.putStone(3, 5, "black"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1, -1,  0,  0,  0 ],
      [ 0,  0,  1, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (4, 2)", () => {
    store.dispatch(ActionCreator.putStone(4, 2, "white"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0,  1,  1,  0,  0,  0 ],
      [ 0,  0,  1, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (5, 4)", () => {
    store.dispatch(ActionCreator.putStone(5, 4, "black"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0,  1, -1,  0,  0,  0 ],
      [ 0,  0,  1, -1, -1, -1,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (5, 3)", () => {
    store.dispatch(ActionCreator.putStone(5, 3, "white"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1,  1,  0,  0,  0 ],
      [ 0,  0,  0,  1,  1,  1,  0,  0 ],
      [ 0,  0,  1, -1, -1, -1,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (5, 2)", () => {
    store.dispatch(ActionCreator.putStone(5, 2, "black"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1, -1, -1,  0,  0 ],
      [ 0,  0,  0,  1, -1, -1,  0,  0 ],
      [ 0,  0,  1, -1, -1, -1,  0,  0 ],
      [ 0,  0,  0, -1,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (5, 2)", () => {
    store.dispatch(ActionCreator.putStone(5, 5, "white"));
    expect(store.getState().board).toEqual([
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0, -1, -1, -1,  0,  0 ],
      [ 0,  0,  0,  1, -1, -1,  0,  0 ],
      [ 0,  0,  1, -1,  1, -1,  0,  0 ],
      [ 0,  0,  0, -1,  0,  1,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ],
      [ 0,  0,  0,  0,  0,  0,  0,  0 ]
    ]);
    expect(store.getState().gameState).toEqual("black");
  });
});
