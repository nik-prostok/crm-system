import axios from 'axios';

export default () => {
  if (localStorage.getItem('token')) {
    return axios.create({
      baseURL: 'http://89.223.91.34:8081',
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')).token,
      },
    });
  }
  return axios.create({
    baseURL: 'http://89.223.91.34:8081',
  });
};
