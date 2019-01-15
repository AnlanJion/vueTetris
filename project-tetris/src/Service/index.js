import axios from 'axios'
export const URL = 'http://172.16.5.34:9024'
export default {
  saveScore (data) {
    return axios.post(`${URL}/tetris/saveScore`, require('qs').stringify(data), {headers: {'content-type': 'application/x-www-form-urlencoded'}, emulateJSON: true})
  },
  getWorldRanking (data) {
    return axios.get(`${URL}/tetris/getWorldRanking`, data, {headers: {}, emulateJSON: true})
  }
}
