/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import CryptoJS from 'crypto-js';

const FE_ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_APP_FE_ENCRYPTION_KEY ||
  'rb27cry2xn2ysh7823bqxry233x9rn3682323888888q8z66';

export const encryptCredentials = (data) =>
  CryptoJS.AES.encrypt(data, FE_ENCRYPTION_KEY).toString();

// export const decryptCredentials = (data) =>
//   CryptoJS.AES.decrypt(data, FE_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)

export const decryptCredentials = (data) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, FE_ENCRYPTION_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) throw new Error('Decryption failed');
    return decryptedData;
  } catch {
    // console.log('Error decrypting credentials:', error);
    return '';
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('access-token')) {
    return decryptCredentials(localStorage.getItem('access-token'));
  }
  // if (localStorage.getItem('access-token')) { return (localStorage.getItem('access-token')); }
  return '';
};

export const removeLoginToken = ( isWindowReload = false ) => {
  localStorage.removeItem('access-token');
  if(isWindowReload){
    window.location.reload();
    window.location.replace('/');
  }
};

export const addLoginToken = (value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('access-token', encryptCredentials(value));
  }
};

export const addToSessionStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};
export const getFromSessionStorage = (key) => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};
export const updateSessionStorage = (key, newValue) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(newValue));
  }
};
export const deleteFromSessionStorage = (key) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};

export const markJustLoggedIn = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('justLoggedIn', 'true');
  }
};

export const hasJustLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('justLoggedIn') === 'true';
  }
  return false;
};

export const clearJustLoggedIn = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('justLoggedIn');
  }
};

export const setLocalTimer = (key, durationInSec, userId) => {
  if (!userId) return;
  const userKey = `${userId}_${key}`;
  const endTime = Date.now() + durationInSec * 1000;
  localStorage.setItem(userKey, endTime);
};

export const getLocalTimer = (key, userId) => {
  if (typeof window === 'undefined' || !userId) return 0;

  const userKey = `${userId}_${key}`;
  const endTime = localStorage.getItem(userKey);
  if (!endTime) return 0;

  const remaining = Math.floor((endTime - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

export const clearLocalTimer = (key, userId) => {
  if (typeof window === 'undefined' || !userId) return;
  const userKey = `${userId}_${key}`;
  localStorage.removeItem(userKey);
};

export const syncTimerWithApi = (key, apiTimeInSec, userId) => {
  if (!userId) return;
  const localTime = getLocalTimer(key, userId);

  if (!localTime || Math.abs(localTime - apiTimeInSec) > 5) {
    setLocalTimer(key, apiTimeInSec, userId);
  }
};


