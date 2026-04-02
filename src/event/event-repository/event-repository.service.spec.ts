import { Test, TestingModule } from '@nestjs/testing';
import { EventRepositoryService } from './event-repository.service';

describe('EventRepositoryService', () => {
  let service: EventRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventRepositoryService],
    }).compile();

    service = module.get<EventRepositoryService>(EventRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
