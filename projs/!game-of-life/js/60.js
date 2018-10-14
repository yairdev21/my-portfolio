// המשחק אמור לתאר לידה ומוות של יצורים, כאשר הלידה והמוות נקבעים לפי כללים מסוימים.
// שדה המשחק: לוח משבצות שגודלו נקבע על פי השחקן )המשתמש(.
// יצור חי יתואר ע"י X . אם אין יצור חי המשבצת תישאר ריקה.
// כל התאים הסמוכים למשבצת מסוימת הם השכנים שלה )כלומר לכל היותר 8 שכנים(.
// כללי המשחק:
// 1 . במשבצת שלה 0-2 שכנים שהם יצורים חיים, לא יתכנו חיים בדור הבא )כלומר: אם היו בה חיים היצור ימות
// מבדידות(.
// // 2 . במשבצת שלה 3-5 שכנים שהם יצורים חיים, יתכנו חיים בדור הבא )כלומר: אם לא היה בה יצור ייוולד –
// חדש, ואם היה הוא ישאר בחיים(. –
// 3 . במשבצת שלה 6-8 שכנים שהם יצורים חיים, לא יתכנו חיים בדור הבא )כלומר: אם היו בה חיים היצור ימות
// מצפיפות(.

'use strict'
console.log('Ex 60 Solution');
var gBoard = createBoard()

renderBoard();


var gameInterval = setInterval(play, 1000);


function createBoard() {
    var board = [];
    var size = +prompt('Enter the size of the matrix');
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            if (Math.random() < 0.5) board[i].push('X');
            else board[i].push('');
        }
    }
    return board;
}



function play() {
    gBoard = runGeneration(gBoard)
    renderBoard(gBoard)
}


function runGeneration(board) {
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        newBoard.push([]);
        for (var j = 0; j < board.length; j++) {
            var currCreaturesAround = countCreaturesAround(board, i, j);
            if (currCreaturesAround >= 0 && currCreaturesAround <=2) newBoard[i].push('');
            if (currCreaturesAround >= 3 && currCreaturesAround <=5) newBoard[i].push('X');
            if (currCreaturesAround >= 6 && currCreaturesAround <=8) newBoard[i].push('');
        }
    }
    return (newBoard);
}

function renderBoard (board){
    return console.table(board);
}


function countCreaturesAround(mat, cellI, cellJ) {
    var CreaturesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === 'X') CreaturesCount++;
        }
    }
    return CreaturesCount;
}


console.log('Done');
