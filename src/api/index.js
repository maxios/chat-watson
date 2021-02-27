import axios from 'axios';
import { env } from '../config';

const waseya = axios.create({
  baseURL: `${env?.api_host}/api`,
  timeout: 40000
});

export const fetchWill = (id, token) =>
  waseya.post('/will/pdf', {id}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const saveWill = (data, token, lang) =>
  waseya.post(`/will/save?lng=${lang}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const fetchSummaryReport = (id, token) =>
  waseya.get(`/will/${id}/pdf`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(({data}) => window.location = data.reportURL)

export const register = data =>
  waseya.post('/auth/register', data)

export const login = ({email, password}) =>
  waseya.post('/auth/login', {email, password})

export const confirm = data =>
  waseya.get(`/auth/confirm?key=${data.key}`)

export const forget_password = data =>
  waseya.post(`/auth/forget`, data)

export const change_password = data =>
  waseya.post(`/auth/change_password`, data)

export const me = token =>
  waseya.get(`/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const getWill = (id, token) =>
  waseya.get(`/will/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const getUserWill = token =>
  waseya.get(`/will/byUser`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

export const lookupOrganizations = () =>
  waseya.get(`/lookup/organizations`)
