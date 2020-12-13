import axios from 'axios';
import config from '../../app/config';
import AuthApi from './AuthApi';

const {
  api: { http },
} = config;

const client = axios.create(http);

export const auth = new AuthApi({ client });

export default client;
