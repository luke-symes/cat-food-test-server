import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Delivery } from 'src/comms/types/delivery';
import * as data from 'data.json';

@Injectable()
export class CommsService {
  getNextDelivery(userId: string): Delivery {
    const deliveryData = data.find((delivery) => delivery.id === userId);

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
