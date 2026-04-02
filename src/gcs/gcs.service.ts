import { Inject, Injectable } from '@nestjs/common';
import { Storage, File } from '@google-cloud/storage';

@Injectable()
    export class GcsService {
        constructor(@Inject('GCS_CLIENT') private readonly gcs: Storage) {}

        async upload(
            bucketName: string,
            buffer: Buffer,
            filename: string,
            contentType?: string
        ): Promise<string> {
            const bucket = this.gcs.bucket(bucketName);
            const file: File = bucket.file(filename);

            await file.save(buffer, { contentType, resumable: false });

            // Renvoyer l’URL publique
            return `https://storage.googleapis.com/${bucketName}/${filename}`;
        }

        async deleteFile(bucketName: string, filename: string) {
            const bucket = this.gcs.bucket(bucketName);
            const file = bucket.file(filename);
            await file.delete();
        }
    }