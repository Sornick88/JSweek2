const add_input1 = "ADD Igor 555-20-01,555-20-41";
const add_input2 = "ADD Alex 555-20-11";
const add_input3 = "ADD Alex 555-20-03";
const remove_input = "REMOVE_PHONE 555-60-11";
const show_input = "SHOW";
// Телефонная книга
var phoneBook = {
  person: []
};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */

const cmdHandler = {
  ADD: addPhone,
  REMOVE_PHONE: removePhone,
  SHOW: show
};

function uniqueSort(arr) {
  let target = arr.concat();
  for (let idx = 0; idx < target.length; idx++) {
    for (let idy = idx + 1; idy < target.length; idy++) {
      if (target[idx] === target[idy]) {
        target.splice(idy--, 1);
      }
    }
  }
  return target;
}

function addPhone(context, cmd) {
  let phoneArr = cmd[2].split(",");
  let nameId = context.person.findIndex(elem => elem.name === cmd[1]);
  if (nameId < 0) {
    context.person.push({ name: cmd[1], phones: [] });
    nameId = context.person.findIndex(elem => elem.name === cmd[1]);
  }
  phoneArr.forEach(element => {
    context.person[nameId].phones.push(element);
  });
  context.person[nameId].phones = uniqueSort(context.person[nameId].phones);
}

function removePhone(context, cmd) {
  let phoneId = -1;
  let nameId = context.person.findIndex(elem => {
    phoneId = elem.phones.findIndex(phone => (phone === cmd[1] ? true : false));
    if (phoneId >= 0) return true;
    return false;
  });
  if (nameId < 0) return false;

  context.person[nameId].phones.splice(phoneId, 1);
  if (context.person[nameId].phones.length < 1) {
    context.person.splice(nameId, 1);
  }
  return true;
}

function show(context, cmd) {
  let buff = context.person.map(
    elem => elem.name + ": " + elem.phones.join(", ")
  );
  return buff.sort();
}

function phoneBookCmdHandler(command) {
  if (typeof command !== "string") return [];
  let cmdArr = command.split(" ");
  if (cmdHandler.hasOwnProperty(cmdArr[0])) {
    return cmdHandler[cmdArr[0]](phoneBook, cmdArr);
  }
  return cmdHandler.SHOW(phoneBook, cmdArr);
}
console.log(phoneBookCmdHandler(add_input1));
console.log(phoneBookCmdHandler(add_input2));
console.log(phoneBookCmdHandler(add_input3));
console.log(phoneBookCmdHandler(remove_input));
console.log(phoneBookCmdHandler(show_input));
