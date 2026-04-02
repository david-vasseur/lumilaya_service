import { Provider } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import path from 'path';

export const GcsProvider: Provider = {
    provide: 'GCS_CLIENT',
    useFactory: () => {
        return new Storage({
            keyFilename: path.join(process.cwd(), 'src/gcs/gcs-key.json'),
        });
    },
};