const add_input = "ADD Alex 555-20-01";
const remove_input = "REMOVE_PHONE 555-20-01";
const show_input = "SHOW";
// Телефонная книга
var phoneBook = {
  person: [
    {
      name: "Alex",
      phones: ["555-20-01", "555-20-03"]
    },
    {
      name: "Ivan",
      phones: ["555-10-01", "555-10-02"]
    }
  ]
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

function addPhone(context, cmd) {
  console.log(cmd);
  let nameId = this.person.findIndex(elem => elem.name === cmd);
  console.log(nameId);
}

function removePhone(context, cmd) {
  let nameId = this.person.findIndex(elem => {
    let phoneIdx = elem.phones.findIndex(phone => {
      if (phone === cmd) return true;
      return false;
    });
    if (typeof phoneIdx === "number") {
      return true;
    }
    return false;
  });
  if (typeof nameId !== "number") return;

  let phoneId = this.person[nameId].phones.findIndex(elem => {
    if (elem === cmd) return true;
    return false;
  });
  this.person[nameId].phones.splice(phoneId, 1);
  if (this.person[nameId].phones.length < 1) {
    this.person.splice(nameId, 1);
  }
  return;
}

function show(context, cmd) {
  let buff = this.person.map(elem => elem.name + ": " + elem.phones.join(", "));
  return buff;
}
function phoneBookCmdHandler(command) {
  if (typeof command !== "string") return [];
  let cmdArr = command.split(" ");
  if (cmdHandler.hasOwnProperty(cmdArr[0])) {
    console.log(cmdArr);
    return cmdHandler[cmdArr[0]].apply(phoneBook, cmdArr);
  }

  return [];
}
console.log(phoneBookCmdHandler(add_input));
console.log(phoneBookCmdHandler(remove_input));
console.log(phoneBookCmdHandler(show_input));
