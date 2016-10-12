main()
function main () {
'use strict'
  const authObj = getAuthObj()
  const dataObj = requestData(authObj)
  const dataToGraph = extractGraphPoints(dataObj)
  
  $(document).ready(function () {
    removeSignInIfLoggedIn(authObj)
    renderGraph(dataToGraph)
  })

function reqListener () {
  console.log(JSON.parse(this.responseText))
  
}

function buildUrl () {
  let retUrl = ''
  let args = arguments
  for (let i in args) {
    retUrl = retUrl + args[i] + '/'
  }
  retUrl = retUrl.slice(0,-1) // Use slice cuz url has extra '/'
  retUrl += '.json'
  return retUrl
}


function requestData (authObj) {
  let authToken = authObj.access_token // 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0TTZGQk4iLCJhdWQiOiIyMjgyODMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDc2Mzc0MTg4LCJpYXQiOjE0NzYyODk5NTF9.sV3JmVlDn6xP7P4zcgFtr5BoJguwQ1D4a7Xa5ZkGZeo'
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
function removeSignInIfLoggedIn (authObj) {
  if (typeof authObj.access_token !== 'undefined') {
    $('.signIn').remove()
  }
} 
function getAuthObj () {
  ///! Parse the url to get the auth tokens and return them as an object
  const fullUrl = window.location.href
  const retObj = splitUrl(fullUrl)
  return retObj
}
function splitUrl (url) {
  const retObj = {}
  retObj.path = url.split('#')[0]
  const fullAuth = url.split('#')[1].split('&')
  for (let indexA in fullAuth) {
    let authTupple = fullAuth[indexA].split('=')
    retObj[authTupple[0]] = authTupple[1]
  }
  return retObj
}
function renderGraph (dataToGraph) {
  let ctx = $("#myChart")
  var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 7, 3, 5, 2, 3],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
})
}
}
