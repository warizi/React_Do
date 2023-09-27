import { initIndexedDB } from "./initIndexedDB"

export const createIndexedDB = async (objectStoreName) => {
  const db = await initIndexedDB();
  const objectStore = db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
  return objectStore;
}

export const readIndexedDB = async (objectStoreName) => {
  const db = await initIndexedDB();
  const objectStore = db.transaction(objectStoreName, 'readonly').objectStore(objectStoreName);
  return objectStore;
}

export const updateIndexedDB = async (objectStoreName) => {
  const db = await initIndexedDB();
  const objectStore = db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
  return objectStore;
}

export const deleteIndexedDB = async (objectStoreName) => {
  const db = await initIndexedDB();
  const objectStore = db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName);
  return objectStore;
}


