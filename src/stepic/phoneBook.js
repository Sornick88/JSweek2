const add_input = "ADD Igor 555-20-01 555-21-01";
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
  let nameId = context.person.findIndex(elem => elem.name === cmd[1]);
  if (nameId < 0) {
    context.person.push({ name: cmd[1], phones: [] });
    nameId = context.person.findIndex(elem => elem.name === cmd[1]);
  }
  let phoneArr = cmd.splice(2);
  console.log(phoneArr);
  console.log(nameId);
  phoneArr.forEach(element => {
    context.person[nameId].phones.push(element);
  });
}

function removePhone(context, cmd) {
  let nameId = context.person.findIndex(elem => {
    let phoneIdx = elem.phones.findIndex(phone =>
      phone === cmd[1] ? true : false
    );
    if (phoneIdx >= 0) return true;
    return false;
  });
  if (nameId < 0) return;

  let phoneId = context.person[nameId].phones.findIndex(phone =>
    phone === cmd[1] ? true : false
  );
  context.person[nameId].phones.splice(phoneId, 1);
  if (context.person[nameId].phones.length < 1) {
    context.person.splice(nameId, 1);
  }
  return;
}

function show(context, cmd) {
  let buff = context.person.map(
    elem => elem.name + ": " + elem.phones.join(", ")
  );
  return buff;
}
function phoneBookCmdHandler(command) {
  if (typeof command !== "string") return [];
  let cmdArr = command.split(" ");
  if (cmdHandler.hasOwnProperty(cmdArr[0])) {
    return cmdHandler[cmdArr[0]](phoneBook, cmdArr);
  }

  return [];
}
console.log(phoneBookCmdHandler(add_input));
console.log(phoneBookCmdHandler(remove_input));
console.log(phoneBookCmdHandler(show_input));
