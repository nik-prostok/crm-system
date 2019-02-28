import axios from 'axios';

export default () => {
  if (localStorage.getItem('token')) {
    return axios.create({
      baseURL: 'http://localhost:8081',
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')).token
      }
    });
  } 
  return axios.create({
    baseURL: 'http://localhost:8081',
  });
};
