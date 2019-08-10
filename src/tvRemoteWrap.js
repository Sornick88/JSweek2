import "./styles.css";

const inputStr = "7q6EC6Frw@7bQi/s1.2c B";

const keyboard = [
  ["a", "b", "c", "d", "e", "1", "2", "3"],
  ["f", "g", "h", "i", "j", "4", "5", "6"],
  ["k", "l", "m", "n", "o", "7", "8", "9"],
  ["p", "q", "r", "s", "t", ".", "@", "0"],
  ["u", "v", "w", "x", "y", "z", "_", "/"],
  ["aA", "SP"]
];

function mapKeyboard(kb) {
  let map = {
    sizeX: kb[0].length,
    sizeY: kb.length
  };
  for (let idy = 0; idy !== kb.length; idy++) {
    for (let idx = 0; idx !== kb[idy].length; idx++) {
      map[`${kb[idy][idx]}`] = [idx, idy];
    }
  }
  return map;
}

function getMinSteps(pos1, pos2, maxValue) {
  return Math.abs(pos1 - pos2) >= Math.abs(pos2 + maxValue - pos1)
    ? Math.abs(pos2 + maxValue - pos1)
    : Math.abs(pos1 - pos2);
}

function summSteps(cur, next, kbMap) {
  let stepX =
    kbMap[cur][0] > kbMap[next][0]
      ? getMinSteps(kbMap[cur][0], kbMap[next][0], kbMap.sizeX)
      : getMinSteps(kbMap[next][0], kbMap[cur][0], kbMap.sizeX);
  let stepY =
    kbMap[cur][1] > kbMap[next][1]
      ? getMinSteps(kbMap[cur][1], kbMap[next][1], kbMap.sizeY)
      : getMinSteps(kbMap[next][1], kbMap[cur][1], kbMap.sizeY);
  console.log(stepX + ":" + stepY);
  return stepX + stepY + 1;
}

function isUpperCase(letter) {
  return /[A-Z]/.test(letter);
}
function isLetter(letter) {
  return /[A-Z]|[a-z]/.test(letter);
}

//function tvRemoteWrap(str) {
const step = function(words) {
  const keyMap = mapKeyboard(keyboard);
  let register = false;
  let nextLetter = "";
  let curLetter = "a";
  let steps = 0;

  for (let strIdx = 0; strIdx !== words.length; strIdx++) {
    if (words[strIdx] === " ") {
      steps += summSteps(curLetter, "SP", keyMap);
      console.log(curLetter + "->SP :" + steps);
      curLetter = "SP";
      continue;
    }
    if (register !== isUpperCase(words[strIdx]) && isLetter(words[strIdx])) {
      register = isUpperCase(words[strIdx]);

      steps += summSteps(curLetter, "aA", keyMap);
      console.log(curLetter + "->aA :" + steps);
      curLetter = "aA";
    }
    nextLetter = words[strIdx];
    if (register) {
      nextLetter = nextLetter.toLowerCase();
    }
    steps += summSteps(curLetter, nextLetter, keyMap);
    console.log(curLetter + "->" + nextLetter + " :" + steps);
    curLetter = nextLetter;
  }
  return steps;
};

console.log(step(inputStr));
