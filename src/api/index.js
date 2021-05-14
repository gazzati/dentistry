import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
