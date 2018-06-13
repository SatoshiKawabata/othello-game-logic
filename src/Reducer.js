const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
const W = 1;  // white
const B = -1; // black
const E = 0;  // empty

const STONE_WHITE = "white";
const STONE_BLACK = "black";

const STATE_INIT = "init";
const STATE_WHITE = "white";
const STATE_BLACK = "black";
const STATE_WIN_WHITE = `win-${STATE_WHITE}`;
const STATE_WIN_BLACK = `win-${STATE_BLACK}`;
const STATE_DRAW = "draw";

const initialBoardState = [
  [ E, E, E, E, E, E, E, E],
  [ E, E, E, E, E, E, E, E],
  [ E, E, E, E, E, E, E, E],
  [ E, E, E, W, B, E, E, E],
  [ E, E, E, B, W, E, E, E],
  [ E, E, E, E, E, E, E, E],
  [ E, E, E, E, E, E, E, E],
  [ E, E, E, E, E, E, E, E],
];

const initialState = {
  gameState: STATE_INIT, // "init", "white", "black", "win-white", "win-black", "draw"
  board: initialBoardState,
  placeableCells: []
};

/**
 *
 * @param {{gameState: string, board: number[][], placeableCells: {x: number, y: number}[]}} state
 * @param {{type: string, stone?: {x: number, y: number, type: "white" | "black"}}} action
 * @returns {{gameState: string, board: number[][], placeableCells: {x: number, y: number}[]}}
 */
const Reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "START_GAME" :
      return Object.assign({}, state, {
        gameState: STATE_BLACK,
        board: initialBoardState,
        placeableCells: getPlacableCells(state.board, STONE_BLACK)
      });

    case "PUT_STONE":

      const nextBoard = place(state.board, action.stone);

      // 勝利判定
      const nextGameState = getNextGameState(nextBoard, state.gameState);

      return Object.assign({}, state, {
        gameState: nextGameState,
        board: nextBoard,
        placeableCells: isGame(nextGameState)
          ? getPlacableCells(nextBoard, getStone(nextGameState))
          : []
      });

    case "SKIP":
      let next = state.gameState;
      if (state.gameState === STATE_WHITE) {
        next = STATE_BLACK;
      } else if (state.gameState === STATE_BLACK) {
        next = STATE_WHITE;
      }
      return Object.assign({}, state, {
        gameState: next
      });

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

/**
 * ゲーム続行中かどうか
 * @param {string} gameState
 * @returns {boolean}
 */
const isGame = gameState => {
  return gameState === STATE_WHITE || gameState === STATE_BLACK;
};

/**
 *
 * @param {string} gameState
 * @return {string} stone type
 */
const getStone = gameState => {
  if (gameState === STATE_BLACK) {
    return STONE_BLACK;
  } else if (gameState === STATE_WHITE) {
    return STONE_WHITE;
  } else {
    return null;
  }
};

/**
 * 石を置いて、裏返す
 * @param {number[][]} board
 * @param {{x: number, y: number, type: "white" | "black"}} param1
 * @return {number[][]}
 */
const place = (board, { x, y, type }) => {
  const next = JSON.parse(JSON.stringify(board));
  const placed = next[y][x] = type === STONE_WHITE ? W : B;

  // 裏返すロジック
  // left direction
  for (let i = x-1; i >= 0; i--) {
    if (next[y][i] === E) {
      break;
    }
    if (next[y][i] === placed) {
      for (let k = i+1; k < x; k++) {
        next[y][k] = placed;
      }
      break;
    }
  }
  // right direction
  for (let i = x+1; i < BOARD_WIDTH; i++) {
    if (next[y][i] === E) {
      break;
    }
    if (next[y][i] === placed) {
      for (let k = i-1; k > x; k--) {
        next[y][k] = placed;
      }
      break;
    }
  }
  // top direction
  for (let i = y-1; i >= 0; i--) {
    if (next[i][x] === E) {
      break;
    }
    if (next[i][x] === placed) {
      for (let k = i+1; k < y; k++) {
        next[k][x] = placed;
      }
      break;
    }
  }
  // bottom direction
  for (let i = y+1; i < BOARD_HEIGHT; i++) {
    if (next[i][x] === E) {
      break;
    }
    if (next[i][x] === placed) {
      for (let k = i-1; k > y; k--) {
        next[k][x] = placed;
      }
      break;
    }
  }

  // right bottom direction
  if (x <= y) {
    const sa = y-x;
    for (let i = y+1; i < BOARD_HEIGHT; i++) {
      if (next[i][i-sa] === E) {
        break;
      }
      if (next[i][i-sa] === placed) {
        for (let k = i-1; k > y; k--) {
          next[k][k-sa] = placed;
        }
        break;
      }
    }
  } else {
    const sa = x-y;
    for (let i = x+1; i < BOARD_WIDTH; i++) {
      if (next[i-sa][i] === E) {
        break;
      }
      if (next[i-sa][i] === placed) {
        for (let k = i-1; k > x; k--) {
          next[k-sa][k] = placed;
        }
        break;
      }
    }
  }
  // right top direction
  if (y < BOARD_WIDTH-1-x) {
    for (let i = y-1; i >= 0; i--) {
      if (next[i][x+(y-i)] === E) {
        break;
      }
      if (next[i][x+(y-i)] === placed) {
        for (let k = i+1; k < y; k++) {
          next[k][x+(y-k)] = placed;
        }
        break;
      }
    }
  } else {
    for (let i = x+1; i < BOARD_WIDTH; i++) {
      if (next[y-(i-x)][i] === E) {
        break;
      }
      if (next[y-(i-x)][i] === placed) {
        for (let k = i-1; k > x; k--) {
          next[y-(k-x)][k] = placed;
        }
        break;
      }
    }
  }
  // left top direction
  if (y < x) {
    for (let i = y-1; i >= 0; i--) {
      if (next[i][x-(y-i)] === E) {
        break;
      }
      if (next[i][x-(y-i)] === placed) {
        for (let k = i+1; k < y; k++) {
          next[k][x-(y-k)] = placed;
        }
        break;
      }
    }
  } else {
    for (let i = x-1; i >= 0; i--) {
      if (next[y-(x-i)][i] === E) {
        break;
      }
      if (next[y-(x-i)][i] === placed) {
        for (let k = i+1; k < x; k++) {
          next[y-(x-k)][k] = placed;
        }
        break;
      }
    }
  }
  // left bottom direction
  if (x < BOARD_HEIGHT-1-y) {
    for (let i = x-1; i >= 0; i--) {
      if (next[y+(x-i)][i] === E) {
        break;
      }
      if (next[y+(x-i)][i] === placed) {
        for (let k = i+1; k < x; k++) {
          next[y+(x-k)][k] = placed;
        }
        break;
      }
    }
  } else {
    for (let i = y+1; i < BOARD_HEIGHT; i++) {
      if (next[i][x-(i-y)] === E) {
        break;
      }
      if (next[i][x-(i-y)] === placed) {
        for (let k = i-1; k > y; k--) {
          next[k][x-(k-y)] = placed;
        }
        break;
      }
    }
  }
  return next;
};

/**
 * 石を置くことができる座標の配列を取得する
 * @param {number[][]} board
 * @param {string} type
 * @returns {{x: number, y: number}[]}
 */
const getPlacableCells = (board, type) => {
  const placeableCells = [];
  board.forEach((rows, y) => {
    rows.forEach((val, x) => {
      if (canPlace(board, { x, y, type })) {
        placeableCells.push({x, y});
      }
    });
  });
  return placeableCells;
};


/**
 * 置けるかどうか
 * @param {number[][]} board
 * @param {{x: number, y: number, type: string}} param1
 * @returns {boolean}
 */
const canPlace = (board, { x, y, type }) => {
  if (board[y][x] !== E) {
    return false;
  }
  const diff = getDiffCells(board, place(board, { x, y, type }));
  return diff.length > 1;
};

/**
 * 2つのボードの差分を取る
 * @param {number[][]} boardA
 * @param {number[][]} boardB
 * @returns {{x: number, y: number}[]}
 */
const getDiffCells = (boardA, boardB) => {
  const diff = [];
  boardA.forEach((rows, y) => {
    rows.forEach((val, x) => {
      if (val !== boardB[y][x]) {
        diff.push({x, y});
      }
    });
  });
  return diff;
}


/**
 *
 * @param {number[][]} board
 * @param {string} currentGameState
 * @returns {string}
 */
const getNextGameState = (board, currentGameState) => {
  let next;
  // ボードが全て埋まっているか
  if (isBoardFull(board)) {
    // 埋まっていれば、どっちが多いか計算
    const {
      whiteNum,
      blackNum
    } = getStoneNum(board);

    if (whiteNum > blackNum) {
      return STATE_WIN_WHITE;
    } else if (blackNum > whiteNum) {
      return STATE_WIN_BLACK;
    } else {
      return STATE_DRAW;
    }
  }

  // ゲーム続行
  if (currentGameState === STATE_WHITE) {
    return STATE_BLACK;
  } else if (currentGameState === STATE_BLACK) {
    return STATE_WHITE;
  }
  return currentGameState;
};

/**
 *
 * @param {number[][]} board
 * @returns {{whiteNum: string, blackNum: string}}
 */
const getStoneNum = board => {
  let whiteNum = 0;
  let blackNum = 0;
  board.forEach(row => row.forEach(val => {
    if (val === W) {
      whiteNum++;
    } else if (val === B) {
      blackNum++;
    }
  }));
  return {
    whiteNum,
    blackNum
  };
};

/**
 * ボードが満タンかどうか
 * @param {*} board
 * @return {boolean}
 */
const isBoardFull = board => {
  const hasEmpty = board.some(row => row.some(val => val === E));
  return !hasEmpty;
};

module.exports = {
  Reducer,
  canPlace,
  place,
  getPlacableCells,
  getNextGameState,
  isBoardFull,
  getStoneNum,
  getDiffCells
};
