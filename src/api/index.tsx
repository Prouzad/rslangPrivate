import {createUserType} from './api.model'

export const createUser= async (user:createUserType) => {
  const rawResponse = await fetch('https:///rs-langs.herokuapp.com/users', {
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

