import { createIndexedDB } from "../api/indexedDB/IndexedDbAPI";
import { TODO_LIST_KEY } from "../constants/KEY"
import { DO_LIST } from "../constants/indexedDBObjectName";
import { getStorage, setStorage } from "./Storage"

export const convertDB = async () => {
  const prevList = getStorage(TODO_LIST_KEY);
  if(!prevList.length && prevList.length === 0) return;
  const deletedIdList = prevList.map((item) => {
    const { id, ...rest } = item;
    return rest;
  });
  await deletedIdList.forEach( async (item) => {
    const objectStore = await createIndexedDB(DO_LIST);
    const request = objectStore.add(item);
  });
  setStorage('backup', prevList);
  setStorage(TODO_LIST_KEY, '');
}
