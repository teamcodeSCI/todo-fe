import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost/project/sci-work-be/public/api/',
  headers: {
    'Content-Type': 'Application/json',
  },
});
export default http;
