import path from 'path';
import {Storage} from '@google-cloud/storage';

class GoogleCloudStorageClient {

  storage;
  bucket;

  constructor() {
    this.storage = new Storage({
      keyFilename: path.resolve(process.cwd(), process.env.GCS_FILE_NAME as string),
    });
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET_NAME as string);
  }

  async uploadJsonFile(data: object, fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);

    await file.save(JSON.stringify(data, null, 2), {
      contentType: 'application/json',
    });

    console.log(`File ${fileName} uploaded successfully.`);
  }

  async readJsonFile(fileName: string): Promise<object | string | null> {
    const file = this.bucket.file(fileName);

    const [exists] = await file.exists();
    if (!exists) {
      return null;
    }

    const [content] = await file.download();
    return JSON.parse(content.toString());
  }
}

export default GoogleCloudStorageClient;
