import axios from 'axios';
import { IWordType } from '../interfaces';
import { createUserType } from './api.model'

export const baseURL = "https://rs-langs.herokuapp.com/";

export const createUser = async (user: createUserType) => {
  const rawResponse = await fetch(`${baseURL}users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
};

export const loginUser = async (user: createUserType) => {
  const rawResponse = await fetch(`${baseURL}signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  console.log(content);
};


export const getLocalStorage = () => {
  if (localStorage.getItem('userData')) {
    return JSON.parse(localStorage.getItem('userData') as string);
  }
};

export const TextbookWords = {
  async getWords(activePage: number, groupNum: number) {
    const params = {
      group: groupNum.toString(),
      page: activePage.toString(),
    };
    const queryParams = new URLSearchParams(params).toString();
    return fetch(`${baseURL}words?${queryParams}`).then((response) => {
      return response.json();
    });
  },
};

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

export async function getUserWords(userId: string | undefined, token: string | undefined, activePage: number, groupNum: number) {
  return axios.get(`${baseURL}users/${userId}/words/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    params: {
      group: groupNum.toString(),
      page: activePage.toString(),
    },
  }).then(response => { return response })
}
