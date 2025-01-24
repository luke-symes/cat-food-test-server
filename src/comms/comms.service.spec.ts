import { Test, TestingModule } from '@nestjs/testing';
import { CommsService } from './comms.service';

describe('CommsService', () => {
  let service: CommsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommsService],
    }).compile();

    service = module.get<CommsService>(CommsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('title', () => {
    test('formatted correctly with 1 cat', () => {
      const response = service.getNextDelivery(
        '618f4ed6-1c5b-4993-a149-f64700bf31dd',
      );
      expect(response.title).toEqual('Your next delivery for Betsy');
    });
    test('formatted correctly with 2 cats', () => {
      const response = service.getNextDelivery(
        'c1307701-fe57-4be6-bdc5-184700d69f4d',
      );
      expect(response.title).toEqual(
        'Your next delivery for Corrine and Jessica',
      );
    });
    test('formatted correctly with 3 cats', () => {
      const response = service.getNextDelivery(
        '76d6eb8d-5c2e-49f7-b798-d69700dda4c3',
      );
      expect(response.title).toEqual(
        'Your next delivery for Destiny, Tiffany and Alexandre',
      );
    });
  });
});
