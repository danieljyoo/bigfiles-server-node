require('dotenv').config()
const bigfiles = require('../lib/server')(process.env.BIGFILES_APIKEY)
const TESTBUCKET = "test.funcmatic.com"
const TESTKEY = "image.test.jpg"
const TESTMTYPE = "image/jpeg"

describe('Multipart Upload', () => {
  it ('should start and cancel a multipart upload using BIGFILES_APIKEY', async () => {
    var startRes = await bigfiles.start(TESTBUCKET, TESTKEY, TESTMTYPE)
    console.log("startRes", startRes)
    expect(startRes).toMatchObject({
      key: TESTKEY,
      status: 'INITIATED',
      id: expect.anything(),
      aws_upload_id: expect.anything()
    })
    var uploadid = startRes.id
    var deleteRes = await bigfiles.cancel(uploadid)
    expect(deleteRes).toBeTruthy()
    // right now deleteRes is kind of nonsensical (mysql delete result set)
    // expect(deleteRes).toMatchObject({})
  }, 5 * 60 * 1000)
})