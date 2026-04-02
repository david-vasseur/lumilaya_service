import { Test, TestingModule } from '@nestjs/testing';
import { GcsProvider } from './gcs';
import { Storage } from '@google-cloud/storage';

describe('GcsProvider', () => {
  let storage: Storage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcsProvider],
    }).compile();

    storage = module.get<Storage>('GCS_CLIENT');
  });

  it('should be defined', () => {
    expect(storage).toBeDefined();
  });

  it('should be instance of Storage', () => {
    expect(storage).toBeInstanceOf(Storage);
  });
});