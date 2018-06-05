module.exports =  {

  startGame: () => {
    return {
      type: "START_GAME"
    };
  },

  putStone: (x, y, type) => {
    return {
      type: "PUT_STONE",
      stone: { x, y, type }
    };
  }
};
