export const readJsonStorage = (key, fallback = null) => {
    try {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) return fallback;
        return JSON.parse(rawValue);
    } catch (error) {
        console.warn(`Removing invalid localStorage value for ${key}`, error);
        localStorage.removeItem(key);
        return fallback;
    }
};

export const writeJsonStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Unable to save localStorage value for ${key}`, error);
    }
};

export const removeStorageValue = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn(`Unable to remove localStorage value for ${key}`, error);
    }
};

export const getStoredUser = () => readJsonStorage('userInfo', null);

export const getAuthConfig = () => {
    const user = getStoredUser();
    return user?.token
        ? { headers: { Authorization: `Bearer ${user.token}` } }
        : {};
};
