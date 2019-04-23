import axios from 'axios';

const env = process.env.NODE_ENV === 'production';

export default axios.create({
  baseURL: env ? '/' : 'http://localhost:5000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
