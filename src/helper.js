import { useState, useEffect } from "react";

const API_KEY = "31f531dc";
function average(arr) {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
}
/**
 *
 * @param {any} initialState
 * @param {string} keyName
 * @description Return The Local Storage As A State
 * @returns [value, setValue]
 */
// Custom Hook Which Will Make An Local Storage Item And Make A State For It
function useLocalStorageState(initialState, keyName) {
  const [value, setValue] = useState(() => {
    const savedMovies = JSON.parse(localStorage.getItem(keyName));
    return savedMovies || initialState;
  });
  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

/**
 *
 * @param {string} keyCode
 * @param  {...functions} callbackFns
 * @description The Code Must Be Excatly Like The Default ( Enter, Escape, Shift... ) But It's Case Insensitive
 * @description To Attach An Key Press To The DOM
 */
function useKeyPress(keyCode, ...callbackFns) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        callbackFns.forEach((callbackFn) => callbackFn());
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [...callbackFns]);
}

export { API_KEY, average, useLocalStorageState, useKeyPress };
