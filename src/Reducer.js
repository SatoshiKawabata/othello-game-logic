const initialBoardState = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,1,-1,0,0,0],
  [0,0,0,-1,1,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];

const initialState = {
  gameState: "init", // "init", "white", "black", "win-white", "win-black", "draw"
  board: initialBoardState
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_GAME" :
      return Object.assign({}, state, {
        gameState: "black"
      });

    case "PUT_STONE":
      // 置けるかどうか
      if (!canPlace(state.board, action.stone)) {
        // 置けなければその色の負け
        return Object.assign({}, state, {
          gameState: `win-${action.stone.type === "black" ? "white" : "black"}`
        });
      }

      // 置ける場合は置く
      const nextBoard = place(state.board, action.stone);

      // 勝利判定
      const nextGameState = getNextGameState(nextBoard, state.gameState);
      return Object.assign({}, state, {
        gameState: nextGameState,
        board: nextBoard
      });
  }
};

/**
 * 置けるかどうか
 */
const canPlace = (board, { x, y, type }) => {
  // 置けるかどうかロジック
  return true;
};

/**
 * 石を置いて、裏返す
 */
const place = (board, { x, y, type }) => {
  const next = JSON.parse(JSON.stringify(board));
  const placed = next[y][x] = type === "white" ? 1 : -1;

  // 裏返すロジック
  // left direction
  for (let i = x-1; i >= 0; i--) {
    if (next[y][i] === 0) {
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
  for (let i = x+1; i < 8; i++) {
    if (next[y][i] === 0) {
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
    if (next[i][x] === 0) {
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
  for (let i = y+1; i < 8; i++) {
    if (next[i][x] === 0) {
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
    for (let i = y+1; i < 8; i++) {
      if (next[i][i-sa] === 0) {
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
    for (let i = x+1; i < 8; i++) {
      if (next[i-sa][i] === 0) {
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
  if (y < 7-x) {
    for (let i = y-1; i >= 0; i--) {
      if (next[i][x+(y-i)] === 0) {
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
    for (let i = x+1; i < 8; i++) {
      if (next[y-(i-x)][i] === 0) {
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
      if (next[i][x-(y-i)] === 0) {
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
      if (next[y-(x-i)][i] === 0) {
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
  if (x < 7-y) {
    for (let i = x-1; i >= 0; i--) {
      if (next[y+(x-i)][i] === 0) {
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
    for (let i = y+1; i < 8; i++) {
      if (next[i][x-(i-y)] === 0) {
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
 */
const getPlacableCells = (board, type) => {
  return [0, 0];
};


/**
 * 勝利判定
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
      return "win-white";
    } else if (blackNum > whiteNum) {
      return "win-black";
    } else {
      return "draw";
    }
  }

  // ゲーム続行
  if (currentGameState === "white") {
    // blackが置けるかどうか
    if (getPlacableCells(board, "black").length > 0) {
      return "black";
    } else {
      return "white";
    }
  } else if (currentGameState === "black") {
    // whiteが置けるかどうか
    if (getPlacableCells(board, "white").length > 0) {
      return "white";
    } else {
      return "black";
    }
  }
  return currentGameState;
};

const getStoneNum = board => {
  let whiteNum = 0;
  let blackNum = 0;
  board.forEach(row => row.forEach(val => {
    if (val === 1) {
      whiteNum++;
    } else if (val === -1) {
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
 */
const isBoardFull = board => {
  const hasEmpty = board.some(row => row.some(val => val === 0));
  return !hasEmpty;
};

module.exports = {
  Reducer,
  canPlace,
  place,
  getPlacableCells,
  getNextGameState,
  isBoardFull,
  getStoneNum
};
