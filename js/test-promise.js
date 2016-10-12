const fetch = require('node-fetch')

const authObj = {
  path: 'https://ailijic.github.io/fit-bit/',                                
  access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0TTZGQk4iLCJhdWQiOiIyMjgyODMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDc2Mzc0MTg4LCJpYXQiOjE0NzYyOTcxOTN9.bsjETO_78rxeJzQl9YMAzip0_T2rKaDUhS_e-NKQ4sc',
  user_id: '4M6FBN',
  scope: 'sleep+settings+nutrition+activity+social+heartrate+profile+weight+location',
  token_type: 'Bearer',
  expires_in: '8003'
}

function buildJsonUrl () {
  let retUrl = ''
  const args = arguments
  for (let i in args) {
    retUrl = retUrl + args[i] + '/'
  }
  retUrl = retUrl.slice(0,-1) // Use slice cuz url has extra '/'
  retUrl += '.json'
  return retUrl
}

function requestData (authObj) {
  // Auth data
  const headerType = authObj.token_type
  const token = authObj.access_token
  const userId = authObj.user_id

  // variables to select what data you want back
  const recordToGet = 'activities/steps'
  const baseDate = '2016-09-01'
  const period = '30d'
  const baseUrl = 'https://api.fitbit.com/1/user'
  const url = buildJsonUrl(baseUrl, userId, recordToGet, 'date', baseDate, period)
  const headerObj = { method: 'get',
    headers: { 'Authorization': headerType + ' ' + token }
  }
  const fetchPromise = fetch(url, headerObj)
  const promise2 = fetchPromise
  /*
  promise2.then( (res) => {
    res.json().then( (data) => { console.log(data) })
  })
  */
  return fetchPromise
}
/////////////////////////////////////////////////////////////////////////////
requestData(authObj)
