const getWidth = function(n) {
  if (n < 1) {
    return 0;
  }
  return Math.pow(2, n + 1) - 1;
}

const getHeight = function(n) {
  if (n < 1) {
    return 0;
  }
  return Math.pow(2, n);
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const drawCurve = function(board, pos, type, params) {
  if (type === 'A') {
    board[pos.y + 1][pos.x] = '┌';
    board[pos.y + 1][pos.x + 1] = '─';
    board[pos.y + 1][pos.x + 2] = '┐';
    if (params && params.end1 === 'left') {
      board[pos.y][pos.x] = '┘';
    }
    if (params && params.end1 === 'down') {
      board[pos.y][pos.x] = '│';
    }
    if (params && params.end2 === 'left') {
      board[pos.y][pos.x] = '┘';
    }
    if (params && params.end2 === 'down') {
      board[pos.y][pos.x + 2] = '│';
    }
    if (params && params.end2 === 'right') {
      board[pos.y][pos.x + 2] = '└';
      if (pos.x + 3 < board[pos.y].length) {
        board[pos.y][pos.x + 3] = '─';
      }
    }
  } else if (type === 'B') {
    board[pos.y + 1][pos.x] = '┌';
    board[pos.y + 1][pos.x + 1] = '─';
    board[pos.y][pos.x] = '└';
    board[pos.y][pos.x + 1] = '─';
    if (params && params.end1 === 'right') {
      board[pos.y + 1][pos.x + 2] = '─';
      if (pos.x + 3 < board[pos.y + 1].length) {
        board[pos.y + 1][pos.x + 3] = '─';
      }
    }
    if (params && params.end1 === 'up') {
      board[pos.y + 1][pos.x + 2] = '┘';
    }
    if (params && params.end2 === 'right') {
      board[pos.y][pos.x + 2] = '─';
      if (pos.x + 3 < board[pos.y].length) {
        board[pos.y][pos.x + 3] = '─';
      }
    }
    if (params && params.end2 === 'down') {
      board[pos.y][pos.x + 2] = '┐';
    }
  } else if (type === 'C') {
    board[pos.y][pos.x] = '└';
    board[pos.y][pos.x + 1] = '─';
    board[pos.y][pos.x + 2] = '┘';
    if (params && params.end1 === 'left') {
      board[pos.y + 1][pos.x] = '┐';
    }
    if (params && params.end1 === 'up') {
      board[pos.y + 1][pos.x] = '│';
    }
    if (params && params.end2 === 'right') {
      board[pos.y + 1][pos.x + 2] = '┌';
      if (pos.x + 3 < board[pos.y + 1].length) {
        board[pos.y + 1][pos.x + 3] = '─';
      }
    }
    if (params && params.end2 === 'up') {
      board[pos.y + 1][pos.x + 2] = '│';
    }
  } else if (type === 'D') {
    board[pos.y + 1][pos.x + 2] = '┐';
    board[pos.y + 1][pos.x + 1] = '─';
    board[pos.y][pos.x + 2] = '┘';
    board[pos.y][pos.x + 1] = '─';
    if (params && params.end1 === 'left') {
      board[pos.y + 1][pos.x] = '─';
    }
    if (params && params.end1 === 'up') {
      board[pos.y + 1][pos.x] = '└';
    }
    if (params && params.end2 === 'left') {
      board[pos.y][pos.x] = '─';
    }
    if (params && params.end2 === 'down') {
      board[pos.y][pos.x] = '┌';
    }
  }
}

const hilbert = function(n, board, pos, type, params) {
  if (n <= 1) {
    drawCurve(board, pos, type, params);
  } else {
    if (type === 'A') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'A', { end1: 'down', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'A', { end1: 'left', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'D', { end1: 'up', end2: params.end1 });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'B', { end1: 'up', end2: params.end2 });
    } else if (type === 'B') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'B', { end1: 'right', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'C', { end1: 'left', end2: params.end1 });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'B', { end1: 'up', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'A', { end1: 'left', end2: params.end2 });
    } else if (type === 'C') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'D', { end1: params.end1, end2: 'down' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'B', { end1: params.end2, end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'C', { end1: 'up', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'C', { end1: 'left', end2: 'up' });
    } else if (type === 'D') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'C', { end1: params.end1, end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'D', { end1: 'left', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'A', { end1: params.end2, end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'D', { end1: 'up', end2: 'left' });
    }
  }
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  return result;
}

const create = function(n) {
  if (n === undefined || isNaN(n) || n < 1) {
    return '';
  }

  const board = createBoard(getWidth(n), getHeight(n));
  hilbert(n, board, { x: 0, y: 0 }, 'A', n === 1 ? { end1: 'down', end2: 'down' } : { end1: 'left', end2: 'right' });
  return draw(board);
}

module.exports = {
  create: create,
  hilbert: hilbert,
};