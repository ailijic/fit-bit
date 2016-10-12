function getAuthObj () {
    ///! Parse the url to get the auth tokens and return them as an object
    // const fullUrl = window.location.href
    const fullUrl = "https://ailijic.github.io/fit-bit/#access_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0TTZGQk4iLCJhdWQiOiIyMjgyODMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDc2Mjg3Nzg5LCJpYXQiOjE0NzYyNzk3ODZ9.4uhf0-OVKoBfX6q9mcWCyArlqJYiLhjJmCeJ1-XtFpU&user_id=4M6FBN&scope=sleep+settings+nutrition+activity+social+heartrate+profile+weight+location&token_type=Bearer&expires_in=8003"
    const retObj = splitUrl(fullUrl)
    console.log(retObj)
    return retObj
}
function splitUrl (url) {
  const retObj = {}
  retObj.path = url.split('#')[0]
  const fullAuth = url.split('#')[1].split('&')
  for (indexA in fullAuth) {
    //console.log(fullAuth[indexA])
    let authTupple = fullAuth[indexA].split('=')
    retObj[authTupple[0]] = authTupple[1]
  }
  return retObj
}
getAuthObj()
