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

const LINES = {
  '─': {
    STANDARD: '─',
    BOLD: '━',
    DOUBLE: '═',
  },
  '│': {
    STANDARD: '│',
    BOLD: '┃',
    DOUBLE: '║',
  },
  '┌': {
    STANDARD: '┌',
    BOLD: '┏',
    DOUBLE: '╔',
  },
  '┐': {
    STANDARD: '┐',
    BOLD: '┓',
    DOUBLE: '╗',
  },
  '┘': {
    STANDARD: '┘',
    BOLD: '┛',
    DOUBLE: '╝',
  },
  '└': {
    STANDARD: '└',
    BOLD: '┗',
    DOUBLE: '╚',
  },
};

const getLine = function(lineId, lineType) {
  if (LINES[lineId] !== undefined && lineType !== undefined) {
    return LINES[lineId][lineType.toUpperCase()];
  } else if (LINES[lineId] !== undefined) {
    return LINES[lineId].STANDARD;
  } else {
    return ' ';
  }
}

const getLineType = function(line) {
  if (line !== undefined && (line.toLowerCase() === 'standard' || line.toLowerCase() === 'double' || line.toLowerCase() === 'bold')) {
    return line.toLowerCase();
  }
  return 'standard';
}

const isValidRotation = function(rotation) {
  return rotation !== undefined && (rotation.toLowerCase() === 'left' || rotation.toLowerCase() === 'right' || rotation.toLowerCase() === 'flip' || rotation.toLowerCase() === 'standard');
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
  if (type === 'standard') {
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
  } else if (type === 'left') {
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
  } else if (type === 'flip') {
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
  } else if (type === 'right') {
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
    if (type === 'standard') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'standard', { end1: 'down', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'standard', { end1: 'left', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'right', { end1: 'up', end2: params.end1 });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'left', { end1: 'up', end2: params.end2 });
    } else if (type === 'left') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'left', { end1: 'right', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'flip', { end1: 'left', end2: params.end1 });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'left', { end1: 'up', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'standard', { end1: 'left', end2: params.end2 });
    } else if (type === 'flip') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'right', { end1: params.end1, end2: 'down' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'left', { end1: params.end2, end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'flip', { end1: 'up', end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'flip', { end1: 'left', end2: 'up' });
    } else if (type === 'right') {
      hilbert(n - 1, board, { x: pos.x, y: pos.y + getHeight(n - 1) }, 'flip', { end1: params.end1, end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y + getHeight(n - 1) }, 'right', { end1: 'left', end2: 'down' });
      hilbert(n - 1, board, { x: pos.x, y: pos.y }, 'standard', { end1: params.end2, end2: 'right' });
      hilbert(n - 1, board, { x: pos.x + getWidth(n - 1) + 1, y: pos.y }, 'right', { end1: 'up', end2: 'left' });
    }
  }
}

const draw = function(board, lineType) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += getLine(board[board.length - i - 1][j], lineType);
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || isNaN(n) || n < 1) {
    return '';
  }

  const board = createBoard(getWidth(n), getHeight(n));

  const rotate = config !== undefined && isValidRotation(config.rotate) ? config.rotate.toLowerCase() : 'standard';
  const lineType = config !== undefined ? getLineType(config.line) : undefined;
  let params = {};
  if (rotate === 'flip') {
    params = n === 1 ? { end1: 'up', end2: 'up' } : { end1: 'left', end2: 'right' };
  } else if (rotate === 'left') {
    params = n === 1 ? { end1: 'right', end2: 'right' } : { end1: 'up', end2: 'down' };
  } else if (rotate === 'right') {
    params = n === 1 ? { end1: 'left', end2: 'left' } : { end1: 'up', end2: 'down' };
  } else {
    params = n === 1 ? { end1: 'down', end2: 'down' } : { end1: 'left', end2: 'right' };
  }

  hilbert(n, board, { x: 0, y: 0 }, rotate, params);
  return draw(board, lineType);
}

module.exports = {
  create: create,
  hilbert: hilbert,
};