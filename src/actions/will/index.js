import Cookies from 'js-cookie';
import { getUserWill, fetchSummaryReport } from '@/api';

export const generateWillReport = () => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    console.log(getState());
    fetchSummaryReport(getState().wizard.id)
      .then(res => {
        dispatch({
          type: 'fetched/summary'
        })
        resolve(res)
      })
      .catch(err => {
        console.log(err);
        reject(err)
      })
  })
}
export const fetchWill = id => {
  const token = Cookies.get(process.env.AUTH_COOKIE);

  return dispatch => new Promise((resolve, reject) => {
    getUserWill(token)
      .then(response => {
        dispatch({
          type: 'get/will',
          payload: response.data
        })
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
