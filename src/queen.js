const input = "h7";

function queen(position) {
  let posibleMove = {};
  if (typeof position !== "string" || position.length > 2) return [];

  let coord = position.split("");
  console.log(coord);
  if (
    !/[a-h]|[A-H]/.test(coord[0]) ||
    isNaN(parseInt(coord[1], 10)) ||
    !/[1-8]/.test(parseInt(coord[1], 10))
  ) {
    return [];
  }
  if (/[a-h]/.test(coord[0])) {
    coord[0] = coord[0].toUpperCase();
  }
  posibleMove[coord[0]] = [];
  const coordNum = parseInt(coord[1], 10);
  const coordNLet = coord[0].charCodeAt(0);
  for (let boardIdxN = 1; boardIdxN <= 8; boardIdxN++) {
    if (boardIdxN !== coordNum) {
      posibleMove[coord[0]].push(boardIdxN);
    }
  }

  for (
    let boardIdxL = "A".charCodeAt(0);
    boardIdxL <= "H".charCodeAt(0);
    boardIdxL++
  ) {
    if (posibleMove[String.fromCharCode(boardIdxL)] === undefined)
      posibleMove[String.fromCharCode(boardIdxL)] = [];
    for (let boardIdxN = 1; boardIdxN <= 8; boardIdxN++) {
      if (boardIdxN === coordNum && coordNLet === boardIdxL) {
        continue;
      }
      if (boardIdxN === coordNum) {
        posibleMove[String.fromCharCode(boardIdxL)].push(boardIdxN);
        continue;
      }
      if (coordNLet - boardIdxL - (coordNum - boardIdxN) === 0) {
        posibleMove[String.fromCharCode(boardIdxL)].push(boardIdxN);
        continue;
      }
      if (coordNLet - boardIdxL + (coordNum - boardIdxN) === 0) {
        posibleMove[String.fromCharCode(boardIdxL)].push(boardIdxN);
        continue;
      }
    }
  }
  let output = [];

  for (
    let boardIdxL = "A".charCodeAt(0);
    boardIdxL <= "H".charCodeAt(0);
    boardIdxL++
  ) {
    let bufferStr = String.fromCharCode(boardIdxL);
    posibleMove[bufferStr].forEach(elem => {
      output.push(`${String.fromCharCode(boardIdxL)}${elem}`);
    });
  }

  return output;
}

console.log(queen(input));
