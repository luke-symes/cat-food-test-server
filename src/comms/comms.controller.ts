import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from 'src/comms/comms.service';
import { DeliveryResponse } from 'src/comms/types/delivery-response';

@Controller('comms')
export class CommsController {
  constructor(private commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getNextDelivery(@Param() params: { userId: string }): DeliveryResponse {
    return this.commsService.getNextDelivery(params.userId);
  }
}
