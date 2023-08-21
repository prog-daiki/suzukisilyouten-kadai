var lines = [];                                           //標準入力された値全てを格納する配列
var words = [];                                           //選ばれた単語を格納する配列
var arrays = [];                                          //ビンゴカードの単語を格納する配列
var count = 0;                                            //ビンゴの数をカウントする変数
var arrays_2 = [];                                        //ビンゴカードの行列を入れ替えたものを格納する配列
var arrays_3 = [];                                        //ビンゴカードの左上から右下への斜めにある単語を格納する配列
var arrays_4 = [];                                        //ビンゴカードの右上から左下への斜めにある単語を格納する配列

var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', function (line) {
  lines.push(line);
});
reader.on('close', function () {
  const num_1 = parseInt(lines[0]);                      //ビンゴカードのサイズSを代入する
  const num_2 = parseInt(lines[num_1 + 1]);              //選ばれた単語の数Nを代入する

  for (var i = 0; i < num_1; i++) {                      //ビンゴカードの単語をarraysに格納する
    arrays[i] = lines[i + 1].split(" ");
  }

  for (var i = 0; i < num_2; i++) {                      //選ばれた単語をwordsに格納する
    words[i] = lines[num_1 + 2 + i];
  }

  for (var i = 0; i < num_1; i++) {                      //ビンゴカードの単語と一致している単語があれば、その単語をbingoに変更する
    for (var j = 0; j < num_1; j++) {
      for (var k = 0; k < num_2; k++) {
        if (arrays[i][j] === words[k]) {
          arrays[i][j] = "bingo"
        }
      }
    }
  }

  for (var i = 0; i < num_1; i++) {                      //各行のビンゴが成立しているか判定する
    if (arrays[i].every(value => value === 'bingo')) {
      count++;
    }
  }

  for (var i = 0; i < num_1; i++) {                      //各列のビンゴが成立しているか判定する
    arrays_2[i] = arrays.map((array) => array[i]);
  }
  for (var i = 0; i < num_1; i++) {
    if (arrays_2[i].every(value => value === 'bingo')) {
      count++;
    }
  }

  for (var i = 0; i < num_1; i++) {                     //左上から右下への斜めでビンゴが成立しているか判定する
    arrays_3[i] = arrays[i][i];
  }
  if (arrays_3.every(value => value === 'bingo')) {
    count++;
  }

  for (var i = 0; i < num_1; i++) {                     //右上から左下への斜めでビンゴが成立しているか判定する
    arrays_4[i] = arrays[i][num_1 - i - 1];
  }
  if (arrays_4.every(value => value === 'bingo')) {
    count++;
  }

  if (count > 0) {                                      //ビンゴが一つでもあればyes,なければnoを出力する
    console.log('yes')
  } else {
    console.log('no')
  }

});
