class Store {

  constructor(reducer) {
    this._reducer = reducer;
  }

  subscribe(listener) {
    this._listeners = this._listeners || [];
    this._listeners.push(listener);
    return this;
  }

  dispatch(action) {
    this._state = this._reducer(this._state, action);
    this._listeners && this._listeners.forEach(listener => {
      listener(this._state);
    });
  }

  getState() {
    return this._state;
  }
}

module.exports = reducer => {
  return new Store(reducer);
};
