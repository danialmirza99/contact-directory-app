
import { openDB } from 'idb';


const initdb = async () =>
  openDB('contactsDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contactsDB')) {
        console.log('contacts database already exists');
        return;
      }
      db.createObjectStore('contacts', 'homePhones', 'cellPhones', 'emails', { keyPath: 'id', autoIncrement: true });
      console.log('contacts database created');
    },
  });



export const postDb = async (content) => {
    console.log('Post to the ase');
    const contactsDB = await openDB('contactsDB', 1);
    const tx = contactsDB.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts', 'homePhones', 'cellPhones', 'emails');
    const request = store.add({ name: content, homePhone: content, cellPhone: content, email: content });
    console.log("This is my log:" + content);
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  };


export const getDb = async () => {
    console.log('GET from the database');
    const contactsDB = await openDB('contactsDB', 1);
    const tx = contactsDB.transaction('contacts', 'readonly');
    const store = tx.objectStore('contacts', 'homePhones', 'cellPhones', 'emails');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};


export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const contactsDB = await openDB('contactsDB', 1);
    const tx = contactsDB.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts', 'homePhones', 'cellPhones', 'emails');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
  };

initdb();
