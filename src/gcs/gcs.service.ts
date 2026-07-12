import { Inject, Injectable } from '@nestjs/common';
import { Storage, File } from '@google-cloud/storage';
import { randomUUID } from 'crypto';

@Injectable()
    export class GcsService {
        constructor(@Inject('GCS_CLIENT') private readonly gcs: Storage) {}

        private sanitizeFilename(filename: string) {
            return filename
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9.-]/g, "");
        }

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

        async uploadMany(
            bucketName: string,
            files: Express.Multer.File[],
        ): Promise<string[]> {

            const uploads = files.map(file => {

                const filename = `${randomUUID()}-${this.sanitizeFilename(file.originalname)}`;

                return this.upload(
                    bucketName,
                    file.buffer,
                    filename,
                    file.mimetype
                );

            });

            return Promise.all(uploads);
        }

        async deleteFile(bucketName: string, filename: string) {
            const bucket = this.gcs.bucket(bucketName);
            const file = bucket.file(filename);
            await file.delete();
        }
    }