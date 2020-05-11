import axios from 'axios'

const api = {
  user: 'https://api.apiopen.top/getWangYiNews'
}
export function getInfos (id) {
  console.log('id ==>', id)
  return axios({
    url: api.user,
    method: 'get'
  })
}
