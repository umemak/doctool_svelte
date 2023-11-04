import { S3Client } from '@aws-sdk/client-s3';
import { AWS_REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, AWS_ENDPOINT } from '$env/static/private';

let s3 = new S3Client({});
if (AWS_ENDPOINT === "") {
    // S3
    s3 = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: ACCESS_KEY_SECRET,
        },
    });
} else {
    // MinIO
    s3 = new S3Client({
        region: AWS_REGION,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: ACCESS_KEY_SECRET,
        },
        endpoint: AWS_ENDPOINT
    });
}

export { s3 };
