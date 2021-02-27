import Cookies from 'js-cookie';
import { me } from '@/api';

export const fetchMe = () => {
  return dispatch => new Promise((resolve, reject) => {
    const token = Cookies.get(process.env.AUTH_COOKIE);

    me(token)
      .then(res => {
        dispatch({
          type: 'fetch/me',
          payload: res.data
        })
        resolve(res);
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
