# othello-game-logic
[![Build Status](https://travis-ci.org/SatoshiKawabata/othello-game-logic.svg?branch=master)](https://travis-ci.org/SatoshiKawabata/othello-game-logic)

## インストール
```sh
npm i othello-game-logic
```

## これは何？
オセロのゲームロジックです。オセロの盤面やプレイヤーの情報をステート(状態)として管理します。使い方はReduxのような感じで使います。

- Store: ゲーム全体のステートを管理
- Action: ステートの変更内容
- Reducer: ステートを変更するための関数群

## State
以下の大きなJSONがゲームのステートになって送られてくる。
```js
{
  // ゲームの局面
  // "init": 始まる前
  // "white": 白のターン
  // "black": 黒のターン
  // "win-white": 白の勝ち
  // "win-black": 黒の勝ち
  // "draw": 引き分け
  gameState: "init"

  // 盤面の状態
  board: [ // 8✕8の２次元配列 (0: 空, 1: 白, -1: 黒)
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, -1, 0, 0, 0 ],
    [ 0, 0, 0, -1, 1, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ]
  ],

  // プレイヤー情報
  white: {
    placeableCells: [ // 白が置ける場所
      {x: 4, y: 2},
      {x: 5, y: 3},
      {x: 2, y: 4},
      {x: 3, y: 5}
    ],
    name: "white" // プレイヤーの名前
  },
  black: {
    placeableCells: [
      {"x": 3, "y": 2},
      {"x": 2, "y": 3},
      {"x": 5, "y": 4},
      {"x": 4, "y": 5}
    ],
    name: "black"
  }
}
```

## Store
Storeによってゲームのステートを管理します。Storeを購読(subscrie)することでステートの変化を監視したり、Actionを投げる(dispatch)ことでstateを変更できます。

### createStore: Storeのインスタンスを作成します
```js
var { createStore } = require("othello-game-logic");
var sotre = createStore();
```


### subscribe: ステートが変化したタイミングでステートを受け取るイベントハンドラを設定します
```js
store.subscribe((state) => {
  // stateが送られてきます
});
```

### dispatch: ステートを変更するためにActionを投げます
```js
var { ActionCreator } = require("othello-game-logic");
// 0, 1の場所に白い石を置くActionを投げる
store.dispatch(ActionCreator.putStone(0, 1, "white"));
```

### getState: ステートを取得します

## ActionCreator
使用できるActionが入っているオブジェクトです。Actionは`store.dispatch`メソッドに渡してやることでステートを変更します。

### startGame
ゲームをスタートさせます。`gameState`を"init"から"black"に変更します。
```js
store.dispatch(ActionCreator.gameStart());
```

### putStone
指定した場所に石を置きます。
```js
store.dispatch(ActionCreator.putStone(0, 1, "white"));
```

### skip
石が置ける場所がない時に、順番をスキップします。
```js
store.dispatch(ActionCreator.skip());
```

### reset
ゲームが終了した時に、`gameState`を"init"に戻し、盤面も初期状態に戻します。
```js
store.dispatch(ActionCreator.reset());
```


## Reducer
ステートを変更するための関数群です。具体的なオセロのロジックの処理はここに書いてあります。stateとactionを渡してstateを返す関数です。

## Reactでの使い方の例
```js
var {createStore, ActionCreator} = require("othello-game-logic");
class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.store = createStore();
    this.store.subscribe((state) => {
      // reactのsetStateでstateを渡してやる
      this.setState(state);
    });
    this.state = this.store.getState();
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          // ゲームをスタートさせます
          this.store.dispatch(ActionCreator.startGame())
        }}>Game Start</button>
      </div>
    );
  }
}
```
