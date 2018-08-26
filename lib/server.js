// USAGE:
// bigfiles = require('bigfiles-server')(APIKEY)
// bigfiles.start(bucket, key, mtype)
// returns: { we start a multipart upload and also give an small upload URL }
// 

const api = require('./api')

class Server {

  constructor(apikey, options) {
    this.apikey = apikey
  }

  // Start a multipart upload using bigfiles API Key
  async start(bucket, key, mtype, options) {
    options = options || { }
    var res = await api.startMultipartUpload(this.apikey, bucket, key, { mtype })
    return res
  }

  // Cancel a multipart upload
  async cancel(uploadid, options) {
    options = options || { }
    var res = await api.deleteMultipartUpload(uploadid, options)
    return res
  }
}

function createServer(apikey, options) {
  options = options || { }
  return new Server(apikey, options)
}

module.exports = createServer