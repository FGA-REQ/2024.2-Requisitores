export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};