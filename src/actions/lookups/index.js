import { lookupOrganizations } from '@/api';

export const fetchOrganizations = () => {
  return dispatch => new Promise((resolve, reject) => {
    lookupOrganizations()
      .then(res => {
        dispatch({
          type: 'fetch/organizations',
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
