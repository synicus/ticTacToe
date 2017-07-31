var prompt = require('prompt');

class ticTacToe {
  constructor() {
    this.board = [['.','.','.'],['.','.','.'],['.','.','.']];
    this.isXTurn = true;
    this.currentPlayer = () => this.isXTurn ? 'X' : 'O';
  }

  renderRow(rowIndex) {
    const row = this.board[rowIndex];
    var output = '';
    for (var i = 0; i < row.length; i++) {
      output += row[i];
      if (i < 2) {
        output += ' '
      }
    }
    console.log(output);
  }

  renderBoard() {
    for (var i = 0; i < this.board.length; i++) {
      this.renderRow(i);
      // if (i < 2) {
      //   console.log('◼︎◼︎◼︎◼︎◼︎')
      // }
    }
  }

  turnPrompt(cb) {
    var that = this;
    var currentPlayer = this.currentPlayer();
    //
    // Start the prompt
    //
    console.log(`Player ${currentPlayer}'s Turn:'`)
    prompt.start();
    //
    // Get two properties from the user: username and email
    //
    prompt.get(['row', 'column'], function (err, result) {
      //
      // Log the results.
      //
      console.log('Command-line input received:');
      console.log('  row: ' + result.row);
      console.log('  column: ' + result.column);
      that.board[result.row][result.column] = currentPlayer;

      if (that.hasWon(result.row, result.column)) {
        that.renderBoard();
        return `${currentPlayer} has won!`
      } else {
        that.isXTurn = !that.isXTurn;
        that.renderBoard();
        that.turnPrompt();
      }

    });
  }

  hasWon(rowI, colI) {
    if (this.board[rowI].every( space => space === this.currentPlayer())) {
      return true;
    } else if ([this.board[0],this.board[1],this.board[2]].every( space => space === this.currentPlayer())) {
      return true;
    } else {
      return false;
    }
  }

  play() {
    while(this.board.some( (row) => row.includes('.'))) {
      this.turnPrompt();
      this.renderBoard();
    }
    console.log('STALEMATE!')
  }
}




var brd = new ticTacToe();

brd.renderBoard();
brd.turnPrompt();
