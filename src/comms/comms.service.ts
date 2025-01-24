import { Injectable } from '@nestjs/common';
import { Delivery } from 'src/comms/types/delivery';

@Injectable()
export class CommsService {
  getNextDelivery(userId: string): Delivery {
    return {
      title: "Your next delivery for <cat names, separated by comma or 'and'>",
      message:
        "Hey <firstName>! In two days' time, we'll be charging you for your next order for <cat names, formatted as described below>'s fresh food.",
      totalPrice: 0,
      freeGift: true,
    };
  }
}
