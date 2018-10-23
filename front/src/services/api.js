import axios from 'axios'
export default () => {
  return axios.create({
    baseURL: 'http://89.223.27.152:8002'
  })
}