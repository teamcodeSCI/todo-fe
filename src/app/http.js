import { API_URL } from '@/utils/const';
import axios from 'axios';

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'Application/json',
  },
});
export default http;
