import axios from 'axios'

const fetch = ({ url, params, method = 'GET', data }) => {
  const options = {
    url: url,
    method,
    params,
    data,
    timeout: 10000,
    withCredentials: true
  }
  // if (method === 'GET') {
  //   options.params = {
  //     ...options.params,
  //     t: new Date().getTime()
  //   }
  // }
  return new Promise((resolve, reject) => {
    axios(options).then((res) => {
      resolve(res.data);
      // console.log(res);
    }).catch(function (error) {
      reject(error);
      // console.log(error);
    });
  })
}

export default fetch
