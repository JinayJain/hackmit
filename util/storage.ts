import COS from "ibm-cos-sdk";

const storage = new COS.S3({
    endpoint: process.env.COS_ENDPOINT,
    apiKeyId: process.env.COS_API_KEY,
    serviceInstanceId: process.env.COS_SERVICE_INSTANCE_ID,
    // ibmAuthEndpoint: process.env.COS_IBM_AUTH_ENDPOINT,
    credentials: new COS.Credentials(
        process.env.COS_ACCESS_KEY_ID!,
        process.env.COS_SECRET_ACCESS_KEY!,
        undefined
    ),
    signatureVersion: "v4",
});

export default storage;
