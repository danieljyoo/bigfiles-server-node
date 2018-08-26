const request = require('request-promise-native')
const DEFAULT_MIME_TYPE = 'application/octet-stream'
const BASE_URL = 'https://c0p55qv0k7.execute-api.us-west-2.amazonaws.com/dev/uploads'

async function startMultipartUpload(apikey, bucket, key, options) {
  var mtype = options.mtype || DEFAULT_MIME_TYPE
  var body = { bucket, key, mtype }
  var requestOptions = {
    method: 'POST',
    url: `${BASE_URL}`,
    body,
    headers: {
      'Authorization': apikey
    },
    json: true
  }
  var res = await request(requestOptions)
  return res
}

async function deleteMultipartUpload(uploadid, options) {
  var requestOptions = {
    method: 'DELETE',
    url: `${BASE_URL}/${uploadid}`,
    json: true
  }
  var res = await request(requestOptions)
  return res
}

module.exports = {
  startMultipartUpload,
  deleteMultipartUpload
}
