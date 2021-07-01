const fs = require('fs').promises;
const path = require('path')
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async ()=> {
    try {
        const data = await fs.readFile(contactsPath);
            const list = JSON.parse(data)
            console.table(list);
    }
    catch (error) {
        throw error;
    }
    };
  
   

const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        const findContact = contacts.find(item => item.id === contactId);
        if (!findContact) {
            console.log('Id incorrect');
            return;
        }
         console.table(findContact);
       
     }
    catch (error) {
        throw error;
    }
  
}
const removeContact = async (contactId) => {
    try {
         const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        const filteredContacts = contacts.filter(item => item.id !== contactId);
        if (filteredContacts.length === contacts.length) {
      console.log(
        `Contact with id "${contactId}" don't deleted! Id "${contactId}" not found!`
      );
      return;
    }
        updateList(filteredContacts);
        console.log(`Contact id=${contactId} deleted`);
        console.table(filteredContacts);
     }
    catch (error) {
        throw error;
    }
  
}

const addContact = async (name, email, phone) => {
    const newContact = {id: v4(),name, email, phone}
    try {
         const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        const newList = [ ...contacts, newContact];
        updateList(newList);
        console.table (newList);

    }
    catch (error) {
        throw error;
    }
  
}

const updateList = async (data) => {
    const str = JSON.stringify(data)
    try {
        await fs.writeFile(contactsPath, str);
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  
}