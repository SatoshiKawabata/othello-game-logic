/**
 * @returns {{type: string}}
 */
const startGame = () => {
  return {
    type: "START_GAME"
  };
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {"white" | "black"} type
 * @returns {{x: number, y: number, type: "white" | "black"}}
 */
const putStone = (x, y, type) => {
  return {
    type: "PUT_STONE",
    stone: { x, y, type }
  };
};

/**
 * @returns {{type: string}}
 */
const skip = () => {
  return {
    type: "SKIP"
  };
};

/**
 * @returns {{type: string}}
 */
const reset = () => {
  return {
    type: "RESET"
  };
};

/**
 * @param {string} playerName
 * @param {"white" | "black"} stoneType
 * @returns { {type: string, playerName: string, stoneType: "white" | "black"} }
 */
const setPlayerName = (playerName, stoneType) => {
  return {
    type: "SET_PLAYER_NAME",
    playerName,
    stoneType
  };
};

module.exports =  {
  ActionCreator: {
    startGame,
    putStone,
    skip,
    reset,
    setPlayerName
  }
};
