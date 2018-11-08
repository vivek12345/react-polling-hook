# 🔔 react-polling-hook
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)


[![Build Status](https://travis-ci.com/vivek12345/react-polling-hook.svg)](https://travis-ci.com/vivek12345/react-polling-hook)

Easy to use polling service built with react that uses the new React Hooks(Note: This is an alpha release)

**Note: Read more about react hooks here  [React hooks](https://reactjs.org/docs/hooks-intro.html)**

### 🚚 Installation

```
yarn add react-polling-hook
```

or

```
npm i react-polling-hook --save
```

### ⚡️ Usage

```javascript
import React, { Fragment } from 'react';
import { usePolling } from 'react-polling-hook';

const App = () => {
  const [isPolling, startPolling, stopPolling] = usePolling({
    url: 'url to poll',
    interval: 3000. // in milliseconds(ms)
    retryCount: 3, // this is optional
    onSuccess: () => console.log('handle success'),
    onFailure: () => console.log('handle failure'), // this is optional
    method: 'GET',
    headers: "headers object", // this is optional
    body: JSON.stringify(data) // data to send in a post call. Should be stringified always
  });

  return (
    <div className="App">
      {isPolling ? (
        <Fragment>
          <div> Hello I am polling</div>
          <button onClick={stopPolling}>Stop Polling</button>
        </Fragment>
      ) : (
        <Fragment>
          <div> Hello I have stopped polling</div>
          <button onClick={startPolling}>Start Polling</button>
        </Fragment>
      )}
    </div>
  );
}
```

## 📒 Api

### 🔔 react-polling

| Props                   | Type                   | Default   | Description                                                                                         |
|-------------------------|------------------------|-----------|-----------------------------------------------------------------------------------------------------|
| url                     | string                 | null      | url/api to poll                                                                                     |
| interval                | number                 | 3000      | Interval of polling                                                                                 |
| retryCount              | number                 | 0         | Number of times to retry when an api polling call fails                                             |
| onSuccess               | function               | -         | Callback function on successful polling. This should return true to continue polling                |
| onFailure               | function               | () => {}  | Callback function on failed polling or api failure                                                  |
| method                  | string                 | GET       | HTTP Method of the api to call                                                                      |
| headers                 | object                 | -         | Any specific http headers that need to be sent with the request                                     |
| body                    | object                 | -         | The data that need to be sent in a post/put call

#### onSuccess (required)

This function will be called every time the polling service gets a successful response.
You should return true to continue polling and false to stop polling. It has the following signature:

```javascript
function onSuccess(response) {
  // You can do anything with this response, may be add to an array of some state of your react component
  // return true to continue polling
  // return false to stop polling
}
```

#### onFailure (not compulsory field)

This function will be called every time the polling service gets a failure response from the api, it can be 401 or 500 or any failure status code.
You can do some cleaning up of your variables or reseting the state here.

```javascript
function onFailure(error) {
  // You can log this error to some logging service
  // clean up some state and variables.
}
```

## 👍 Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions and pull request are welcome !

### 📝 License

MIT © [viveknayyar](https://github.com/vivek12345)

## 👷 TODO

- [x] Complete README
- [ ] Add Examples and Demo
- [ ] Test Suite

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/4931048?v=4" width="100px;"/><br /><sub><b>Vivek Nayyar</b></sub>](https://www.viveknayyar.in/)<br />[📖](https://github.com/vivek12345/react-polling-hook/commits?author=vivek12345 "Documentation") [💻](https://github.com/vivek12345/react-polling-hook/commits?author=vivek12345 "Code") [🎨](#design-vivek12345 "Design") [💡](#example-vivek12345 "Examples") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!