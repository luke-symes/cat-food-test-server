import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeliveryResponse } from 'src/comms/types/delivery-response';
import * as deliveriesData from 'data.json';
import { Delivery } from 'types/delivery';

@Injectable()
export class CommsService {
  private data: Delivery[] = JSON.parse(JSON.stringify(deliveriesData));

  getNextDelivery(userId: string): DeliveryResponse {
    const deliveryData: Delivery | undefined = this.data.find(
      (delivery) => delivery.id === userId,
    );

    if (!deliveryData)
      throw new HttpException('No order found', HttpStatus.NOT_FOUND);

    return {
      title: "Your next delivery for <cat names, separated by comma or 'and'>",
      message:
        "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
      totalPrice: 0,
      freeGift: true,
    };
  }
}
