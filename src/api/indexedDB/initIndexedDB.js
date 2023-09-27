import { DO_LIST, HISTORY_LIST } from "../../constants/indexedDBObjectName";
import { INDEXED_DB_VERSION } from "../../constants/indexedDBVersion";

export const initIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const dbReq = indexedDB.open('todoList', INDEXED_DB_VERSION);
    
    let db;
    
    dbReq.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    
    dbReq.onerror = (event) => {
      reject(event.target.error);
    };
    dbReq.onupgradeneeded = (event) => {
      db = event.target.result;
      let oldVersion = event.oldVersion;
      if (oldVersion < 1) {
        db.createObjectStore(DO_LIST, { keyPath: 'id', autoIncrement: true });
        db.createObjectStore(HISTORY_LIST, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};
