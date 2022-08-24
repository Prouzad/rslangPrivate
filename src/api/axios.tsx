import axios from 'axios'

export default axios.create({
  baseURL: 'https:///rs-langs.herokuapp.com',
  responseType: "json"
}) 


