import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from 'src/comms/comms.service';
import { Delivery } from 'src/comms/types/delivery';

@Controller('comms')
export class CommsController {
  constructor(private commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getNextDelivery(@Param() params: { userId: string }): Delivery {
    return this.commsService.getNextDelivery(params.userId);
  }
}
