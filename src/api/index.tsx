import axios from 'axios';
import { IWordType } from '../interfaces';
import { createUserType } from './api.model'

export const baseURL = "https://rs-langs.herokuapp.com/";

export async function createUser (user: createUserType) {
  return await axios.post(
    `${baseURL}users`,
    user,
    { 
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      },
    },
  )
};

export async function loginUser (user: createUserType) {
  return await axios.post(
    `${baseURL}signin`,
    user,
    { 
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      },
    },
  )
};


export const getLocalStorage = () => {
  if (localStorage.getItem('userData')) {
    return JSON.parse(localStorage.getItem('userData') as string);
  }
};


export const removeLocalStorage = (user: string) => {
  localStorage.removeItem(user)
};

export const setLocalStorage = (user: string) => {
  localStorage.setItem('userData', user)
};

export async function getWords(activePage: number, groupNum: number) {
  return await axios.get(
    `${baseURL}words?group=${groupNum}&page=${activePage}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function setWordToDictionary(
  userId: string,
  wordId: string,
  wordInfo: IWordType,
  token: string
) {
  await axios.post(
    `${baseURL}users/${userId}/words/${wordId}`,
    wordInfo,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => { return response })
}

export async function deleteWordFromDictionary(
  userId: string | undefined,
  wordId: string | undefined,
  token: string | undefined,
) {
  await axios.delete(
    `${baseURL}users/${userId}/words/${wordId}`,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => { return response })
}

export async function getUserWords(userId: string | undefined, token: string | undefined) {
  return axios.get(`${baseURL}users/${userId}/words/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(response => { return response })
}

export async function ChangeUserWords(
  userId: string,
  wordId: string,
  wordInfo: IWordType,
  token: string
) {
  await axios.put(
    `${baseURL}users/${userId}/words/${wordId}`,
    wordInfo,
    {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => { return response })
}

export async function getWord(userId: string, wordId: string, token: string) {
  const response = axios.get(`${baseURL}users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return await response;
}

export async function changeWord(
  userId: string,
  wordId: string,
  wordInfo: IWordType,
  token: string
) {
  const response = axios.put(
    `${baseURL}users/${userId}/words/${wordId}`,
    wordInfo,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return await response;
}
