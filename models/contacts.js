const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const readContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath,"utf-8");
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contactById = contacts.filter((contact) => contact.id === contactId);
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedDb = contacts.filter((contact) => contact.id !== contactId);
  await writeContacts(updatedDb);
  return updatedDb;
}

const addContact = async (body) => {
  const contacts = await readContacts();
  const id = nanoid();
  const newContact = { id, ...body };

  contacts.push(newContact);

  await writeContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const updateContact = contacts.reduce((acc, item) => {
    if (item.id === contactId) {
      return [...acc, { id: contactId, ...body }];
    }
    return [...acc, item];
  }, []);
    
  
  await writeContacts(updateContact);
  return updateContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
