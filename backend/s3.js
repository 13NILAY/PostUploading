// Your code
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

dotenv.config();

const region = "us-west-2";
   const bucketName = "upload-bucket-nilay";
   const accessKeyId = process.env.AWS_ACCESS_KEY;
   const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
   console.log(accessKeyId);
   console.log(secretKey);
// aws.config.update({
//     region: 'us-west-2', // Replace with your desired AWS region
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    
//   });

  
  // Rest of your code...
  

// Set AWS_SDK_LOAD_CONFIG
// process.env.AWS_SDK_LOAD_CONFIG = 1;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretKey,
  signatureVersion: 'v4'

});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

module.exports = generateUploadURL;
