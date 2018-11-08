import React, { useState, useEffect, useRef } from 'react';

const usePolling = config => {
  const version = React.version.split('-');
  if (version[0] < '16.7.0') {
    throw new Error('Hooks are only supported in React 16.7.0-alpha release or above');
  }
  let { url, interval = 3000, retryCount = 0, onSuccess, onFailure = () => {}, ...api } = config;
  const [isPolling, togglePolling] = useState(false);

  const persistedIsPolling = useRef();
  const isMounted = useRef();
  const poll = useRef();

  persistedIsPolling.current = isPolling;

  useEffect(() => {
    isMounted.current = true;
    startPolling();
    return () => {
      isMounted.current = false;
      stopPolling();
    };
  }, []);

  // if no url specified, throw an error
  if (!url) {
    throw new Error('No url provided to poll. Please provide a config object with the url param set');
  }

  const shouldRetry = retryCount ? true : false;

  const stopPolling = () => {
    if (isMounted.current) {
      if (poll.current) {
        clearTimeout(poll.current);
        poll.current = null;
      }
      togglePolling(false);
    }
  };

  const startPolling = () => {
    // why this does not update state?
    togglePolling(true);
    // call runPolling, which will start timer and call our api
    runPolling();
  };

  const runPolling = () => {
    const timeoutId = setTimeout(() => {
      /* onSuccess would be handled by the user of service which would either return true or false
             * true - This means we need to continue polling
             * false - This means we need to stop polling
             */
      fetch(url, api)
        .then(resp => {
          return resp.json().then(data => {
            if (resp.ok) {
              return data;
            } else {
              return Promise.reject({ status: resp.status, data });
            }
          });
        })
        .then(onSuccess)
        .then(continuePolling => {
          persistedIsPolling.current && continuePolling ? runPolling() : stopPolling();
        })
        .catch(error => {
          if (shouldRetry && retryCount > 0) {
            onFailure && onFailure(error);
            retryCount--;
            runPolling();
          } else {
            onFailure && onFailure(error);
            stopPolling();
          }
        });
    }, interval);
    poll.current = timeoutId;
  };

  return [isPolling, startPolling, stopPolling];
};

export default usePolling;
