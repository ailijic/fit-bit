main()
function main () {
'use strict'
  const authObj = getAuthObj()
  const jsonPromise = requestData(authObj)
  $(document).ready(function () {
    removeSignInIfLoggedIn(authObj)
    resolvePromise(jsonPromise, graphJson)  
  })
  function graphJson (jsonObj) {
    console.log(jsonObj)
    const points = extractPoints(jsonObj)
    renderGraph(points)
  }
/////////////////////////////////////////////////////////////////////////////
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
  const headerObj = { 
    method: 'get',
    headers: { 'Authorization': headerType + ' ' + token }
  }
  const fetchPromise = fetch(url, headerObj)
  return fetchPromise
}
function resolvePromise (promise, nextFunc) {
  promise.then( (response) => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status)
      return
    }
    else { response.json().then( (data) => nextFunc(data) )
    }
  })
  .catch( (err) => { console.log('Fetch Error :-S', err) })
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
function extractPoints (jsonObj) {
  const arrayOfObjects = jsonObj["activities-steps"]
  let retArray = []
  for (let i in arrayOfObjects) {
    retArray.push(arrayOfObjects[i].value)
  }
  retArray = retArray.map((val) => {
    return parseInt(val)
  })
  return retArray
}
function renderGraph (points) {
  let ctx = $("#myChart")
  let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["2016-08-03", "2016-08-09", "2016-08-15", "2016-08-21", "2016-08-27"],
    datasets: [{
      label: 'Steps',
      data: points,
      backgroundColor: "rgba(153,255,51,0.4)",
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
