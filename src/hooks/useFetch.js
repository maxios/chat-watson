import React from 'react';

export default () => {
  const [response, setResponse] = React.useState({});
  const [error, setError] = React.useState({});
  const [success, setSuccess] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const fetchWrapper = ({path, body, hostname, ...restOpts}) => {
    setIsPending(true)
    return fetch(
      `${hostname || ''}${path}`,
      {
        cors: 'cors',
        body: JSON.stringify(body),
        ...restOpts
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setSuccess(true);
        setResponse(data)
      })
      .catch(err => {
        setSuccess(false);
        setError(err)
      })
      .finally(() => {
        setIsPending(false)
      })
  }

  return { fetchWrapper, response, error, success, isPending }
}
