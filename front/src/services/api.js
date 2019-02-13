import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
      Authorization: JSON.parse(localStorage.getItem('token')).token,
    },
  });

  /*  if (typeof localStorage !== typeof undefined) {


  } */

  /* const data = {};

    axios
      .post('/api/secretInfo', data, config)
      .then((result) => {
        vm.$data.secretUserData = result.data.secretData;
        vm.$data.isAuthorized = true;
      })
      .catch(err => console.log(err));

    axios
      .post('/api/secretInfoAdmin', data, config)
      .then((result) => {
        vm.$data.secretAdminData = result.data.secretData;
        vm.$data.isAuthorized = true;
      })
      .catch(err => console.log(err)); */
};
