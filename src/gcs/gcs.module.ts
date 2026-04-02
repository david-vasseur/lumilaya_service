import { Module } from '@nestjs/common';
import { GcsProvider } from './gcs';
import { GcsService } from './gcs.service';

@Module({
  providers: [GcsService, GcsProvider],
  exports: [GcsService],
})
export class GcsModule {}
