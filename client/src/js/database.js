import { openDB } from 'idb';

const initdb = async () =>
// creates a new database called jate with an object store called jate and a key path of id and autoIncrement set to true (so that each new record will have a unique id) if the database doesn't already exist (if it does, it will just open the existing database) and logs a message to the console to let us know what happened 
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  // const id = await store.put({ id: 1, value: content });

  const request = store.put({ id: 1, value: content });

  const result = await request;
  
  console.log( 'Data saved to the database', result);
  // return result;
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  console.log( 'result.value', result);
  return result.value;
};

initdb();
