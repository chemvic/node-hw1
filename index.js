const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { listContacts,
    getContactById,
    removeContact,
    addContact}=require('./contacts');

const argv = program.opts();

const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts =await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact); 
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

