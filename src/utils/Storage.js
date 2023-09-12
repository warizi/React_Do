export const getStorage = (STORAGE_KEY) => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : []
}

export const setStorage = (STORAGE_KEY, data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const createId = (STORAGE_KEY) => {
    const data = getStorage(STORAGE_KEY);
    if(data.length === 0) return 1;
    if(data.length === 1) return data[0].id + 1;
    const largestId = data.reduce((prev, current) => {
        return prev.id > current.id ? prev.id : current.id
    })

    const id = largestId + 1;
    return id
}
