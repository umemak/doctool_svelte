import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { AWS_REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, AWS_ENDPOINT, S3_BUCKET_NAME, LOG_LEVEL } from '$env/static/private';
import { ulid } from 'ulid';
import log4js from 'log4js';

let s3 = new S3Client({});
if (AWS_ENDPOINT !== "") {
    // use MinIO
    s3 = new S3Client({
        region: AWS_REGION,
        forcePathStyle: true,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: ACCESS_KEY_SECRET,
        },
        endpoint: AWS_ENDPOINT
    });
}

const upload = async (file: File) => {
    const objPath = ulid().toLowerCase();
    const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: objPath,
        Body: Buffer.from(await file.arrayBuffer()),
    });
    try {
        const response = await s3.send(command);
        const log = log4js.getLogger();
        log.level = LOG_LEVEL;
        log.debug('upload: %s', JSON.stringify(response));
    }
    catch (err) {
        const log = log4js.getLogger();
        log.level = LOG_LEVEL;
        log.error('upload: %s', JSON.stringify(err));
        return "";
    }
    return objPath;
}

const download = async (objPath: string, filename: string) => {
    const command = new GetObjectCommand({
		Bucket: S3_BUCKET_NAME,
		Key: objPath,
	});
	try {
		const response = await s3.send(command);
		return new Response(response.Body?.transformToWebStream(),
			{
				headers: {
					"Content-Type": "application/octet-stream",
					"Content-Disposition": "attachement; filename=" + filename,
				}
			});
	} catch (err) {
		console.error(err);
        return new Response(null, { status: 500 });
	}
}

export { upload, download };
