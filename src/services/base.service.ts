import axios from 'axios';

/**
 * Axios instance for browser,
 * with `x-access-token` header injected
 */
export const apiClientBrowser = axios.create();
