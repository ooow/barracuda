import axios from 'axios';

const host = process.env.NODE_ENV === 'production'
  ? 'http://gonce.io:5000/' : 'http://localhost:5000/';

export default axios.create({
  baseURL: host,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
