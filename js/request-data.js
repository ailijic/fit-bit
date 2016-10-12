let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let authObj = {

}

function reqListener () {
  console.log(typeof this.responseText)
}

function buildUrl () {
  let retUrl = ''
  let args = arguments
  for (i in args) {
    retUrl = retUrl + args[i] + '/'
  }
  retUrl = retUrl.slice(0,-1) // Use slice cuz url has extra '/'
  retUrl += '.json'
  return retUrl
}

requestData()
function requestData (authObj) {
  let authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0TTZGQk4iLCJhdWQiOiIyMjgyODMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDc2Mzc0MTg4LCJpYXQiOjE0NzYyODk5NTF9.sV3JmVlDn6xP7P4zcgFtr5BoJguwQ1D4a7Xa5ZkGZeo'
  let userId = '4M6FBN'
  let recordToGet = 'activities/steps'
  let baseDate = '2016-09-01'
  let period = '30d'
  let baseUrl = 'https://api.fitbit.com/1/user'
  let url = buildUrl(baseUrl, userId, recordToGet, 'date', baseDate, period)
  let oReq = new XMLHttpRequest()
  oReq.addEventListener('load', reqListener)
  oReq.open('GET', url)
  oReq.setRequestHeader('Authorization', 'Bearer ' + authToken)
  oReq.send()
}
