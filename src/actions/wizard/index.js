import Cookies from 'js-cookie';
import * as R from 'ramda';
import { saveWill, fetchWill, fetchSummaryReport } from '@/api';
export const SAVE_WIZARD_FORM = 'save/wizard/form';
export const SAVE_PROGRESS = 'save/progress';
export const SAVE_LIST_ITEM = 'save/list';
export const EDIT_LIST_ITEM = 'edit/list';
export const REMOVE_LIST_ITEM = 'remove/list';
export const SAVE_CONDITION = 'save/condition';

export const generateSummaryPDF = (id) => {
  const token = Cookies.get(process.env.AUTH_COOKIE);

  return () => new Promise((resolve, reject) => {
    fetchSummaryReport(id, token)
      .then(res => {
        console.log(res);
        resolve(res)
      })
      .catch(err => {
        console.log(err);
        reject(err)
      })
  })
}
export const fetchWillData = (id) => {
  const token = Cookies.get(process.env.AUTH_COOKIE);

  return dispatch => new Promise((resolve, reject) => {
    fetchWill(id, token)
      .then(res => {
        dispatch({ type: 'fetch/will', payload: res.data })
      })

  })
}

export const saveForm = (step, data, action = "saved") => {
  const token = Cookies.get(process.env.AUTH_COOKIE);

  return (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({
      type: SAVE_WIZARD_FORM,
      payload: { step, data, action }
    })
    const { progress, locks } = getState().wizard;
    saveWill({step, data: {...data, progress, locks }}, token, getState().i18n.locale)
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        console.log(e)
        reject(e)
      });
  })
}

export const savePDFSummary = () => {
  return () => new Promise((resolve, reject) => {
    const token = Cookies.get(process.env.AUTH_COOKIE);

    savePDFSummary({data}, token)
      .then(res => {
        console.log(res);

        resolve(res)
      })
      .catch(() => {
        console.log(e)
        reject(e)
      });
  })
}

export const saveProgress = ({milestoneIndex, stepIndex, stepId}) => {
  return {
    type: SAVE_PROGRESS,
    payload: {milestoneIndex, stepIndex, stepId}
  }
}

export const saveListItem = (data, key) => {
  return {
    type: SAVE_LIST_ITEM,
    payload: {
      data,
      key
    }
  }
}

export const editListItem = (data, index, key) => {
  return {
    type: EDIT_LIST_ITEM,
    payload: {
      index,
      data,
      key
    }
  }
}

export const removeListItem = (index, key) => {
  return {
    type: REMOVE_LIST_ITEM,
    payload: {
      index,
      key
    }
  }
}

export const saveCondition = (id, data) => {
  return {
    type: REMOVE_LIST_ITEM,
    payload: {
      id,
      data
    }
  }
}

export const start = () => {
  return {
    type: 'start'
  }
}

export const unlock = (key, action = false) => {
  return {
    type: 'unlock',
    payload: {
      key,
      action
    }
  }
}

