class Store {

  /**
   *
   * @param {*} reducer
   */
  constructor(reducer) {
    this._reducer = reducer;
    this._state = reducer();
  }

  /**
   *
   * @param {() => {gameState: string, board: number[][], placeableCells: {x: number, y: number}[]}} listener
   */
  subscribe(listener) {
    this._listeners = this._listeners || [];
    this._listeners.push(listener);
    return this;
  }

  /**
   *
   * @param {{type: string, stone?: {x:numner, y: number, type: "white" | "black"}}} action
   */
  dispatch(action) {
    this._state = this._reducer(this._state, action);
    this._listeners && this._listeners.forEach(listener => {
      listener(this._state);
    });
  }

  /**
   * @returns {{gameState: string, board: number[][], placeableCells: {x: number, y: number}[]}}
   */
  getState() {
    return this._state;
  }
}

module.exports = {
  Store
};
