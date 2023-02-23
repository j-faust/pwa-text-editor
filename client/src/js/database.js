import { openDB } from 'idb';

const initdb = async () =>
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

// exporting the putDb function that contains the put route to update the indexeddb db
export const putDb = async (content) => {
  console.log('PUT to the DB');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });
  
  const result  = await request;

  console.log('result.value', result);
  // return result;
  return result?.value;
}


// exporting the getDb function containing the get route for the indexeddb db
export const getDb = async () => {
  console.log('GET from the DB');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);

  console.log(result);
  return result;

}


initdb();
