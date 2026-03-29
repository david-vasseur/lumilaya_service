import { Test, TestingModule } from '@nestjs/testing';
import { PrismaDbNestService } from './prisma-db-lumilaya.service';

describe('PrismaDbNestService', () => {
  let service: PrismaDbNestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaDbNestService],
    }).compile();

    service = module.get<PrismaDbNestService>(PrismaDbNestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
