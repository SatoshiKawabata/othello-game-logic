const {Store} = require("./Store");
const {Reducer} = require("./Reducers");
const {ActionCreator} = require("./ActionCreator");

describe("Store test", () => {
  const store = new Store(Reducer);
  it("start game", () => {
    store.dispatch(ActionCreator.startGame());
    expect(store.getState().gameState).toEqual("black");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 3, "y": 2},
      {"x": 2, "y": 3},
      {"x": 5, "y": 4},
      {"x": 4, "y": 5}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 4, "y": 2},
      {"x": 5, "y": 3},
      {"x": 2, "y": 4},
      {"x": 3, "y": 5}
    ]);

    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (3, 2)", () => {
    store.dispatch(ActionCreator.putStone(3, 2, "black"));
    expect(store.getState().gameState).toEqual("white");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 5, "y": 4},
      {"x": 4, "y": 5},
      {"x": 5, "y": 5}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 2, "y": 2},
      {"x": 4, "y": 2},
      {"x": 2, "y": 4}
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (2, 4)", () => {
    store.dispatch(ActionCreator.putStone(2, 4, "white"));
    expect(store.getState().gameState).toEqual("black");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 1, "y": 5}, {"x": 2, "y": 5}, {"x": 3, "y": 5}, {"x": 4, "y": 5}, {"x": 5, "y": 5}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 3, "y": 1}, {"x": 2, "y": 2}, {"x": 4, "y": 2}, {"x": 5, "y": 2}
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (3, 5)", () => {
    store.dispatch(ActionCreator.putStone(3, 5, "black"));
    expect(store.getState().gameState).toEqual("white");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 1, "y": 3}, {"x": 5, "y": 3}, {"x": 1, "y": 4}, {"x": 5, "y": 4}, {"x": 1, "y": 5}, {"x": 4, "y": 5}, {"x": 5, "y": 5}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 2, "y": 2}, {"x": 4, "y": 2}, {"x": 2, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (4, 2)", () => {
    store.dispatch(ActionCreator.putStone(4, 2, "white"));
    expect(store.getState().gameState).toEqual("black");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 5, "y": 2}, {"x": 1, "y": 3}, {"x": 5, "y": 3}, {"x": 1, "y": 4}, {"x": 5, "y": 4}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 2, "y": 1}, {"x": 3, "y": 1}, {"x": 2, "y": 2}, {"x": 2, "y": 5}, {"x": 2, "y": 6}, {"x": 3, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (5, 4)", () => {
    store.dispatch(ActionCreator.putStone(5, 4, "black"));
    expect(store.getState().gameState).toEqual("white");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 4, "y": 1}, {"x": 2, "y": 2}, {"x": 5, "y": 2}, {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 1, "y": 4}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 3, "y": 1}, {"x": 2, "y": 2}, {"x": 5, "y": 3}, {"x": 6, "y": 4}, {"x": 4, "y": 5}, {"x": 5, "y": 5}, {"x": 3, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (5, 3)", () => {
    store.dispatch(ActionCreator.putStone(5, 3, "white"));
    expect(store.getState().gameState).toEqual("black");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 4, "y": 1}, {"x": 2, "y": 2}, {"x": 5, "y": 2}, {"x": 6, "y": 2}, {"x": 1, "y": 3}, {"x": 1, "y": 4}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 2, "y": 1}, {"x": 3, "y": 1}, {"x": 2, "y": 2}, {"x": 6, "y": 4}, {"x": 2, "y": 5}, {"x": 4, "y": 5}, {"x": 5, "y": 5}, {"x": 6, "y": 5}, {"x": 2, "y": 6}, {"x": 3, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("black");
  });

  it("put black stone (5, 2)", () => {
    store.dispatch(ActionCreator.putStone(5, 2, "black"));
    expect(store.getState().gameState).toEqual("white");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 2, "y": 2}, {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 1, "y": 4}, {"x": 1, "y": 5}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 3, "y": 1}, {"x": 5, "y": 1}, {"x": 6, "y": 3}, {"x": 6, "y": 4}, {"x": 5, "y": 5}, {"x": 3, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("white");
  });

  it("put white stone (5, 2)", () => {
    store.dispatch(ActionCreator.putStone(5, 5, "white"));
    expect(store.getState().gameState).toEqual("black");
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
    expect(store.getState().black.placeableCells).toEqual([
      {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 1, "y": 4}, {"x": 1, "y": 5}, {"x": 4, "y": 5}, {"x": 5, "y": 6}
    ]);
    expect(store.getState().white.placeableCells).toEqual([
      {"x": 3, "y": 1}, {"x": 4, "y": 1}, {"x": 5, "y": 1}, {"x": 6, "y": 2}, {"x": 6, "y": 3}, {"x": 6, "y": 4}, {"x": 2, "y": 6}, {"x": 3, "y": 6}, {"x": 4, "y": 6}
    ]);
    expect(store.getState().gameState).toEqual("black");
  });
});
