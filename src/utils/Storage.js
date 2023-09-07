export const getStorage = (STORAGE_KEY) => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []
}

export const setStorage = (STORAGE_KEY, data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const createId = (STORAGE_KEY) => {
    const data = getStorage(STORAGE_KEY);
    const lastIndex = data.length - 1;
    const id = data.length > 0 ? data[lastIndex].id + 1 : 1;
    return id
}
