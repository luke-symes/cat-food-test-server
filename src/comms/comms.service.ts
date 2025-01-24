import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeliveryResponse } from 'src/comms/types/delivery-response';
import * as deliveriesData from 'data.json';
import { Delivery } from 'src/types/delivery';
import { POUCH_PRICES } from 'src/constants/pouch-prices';

@Injectable()
export class CommsService {
  private data: Delivery[] = JSON.parse(JSON.stringify(deliveriesData));

  getNextDelivery(userId: string): DeliveryResponse {
    const deliveryData: Delivery | undefined = this.data.find(
      (delivery) => delivery.id === userId,
    );

    if (!deliveryData)
      throw new HttpException('No order found', HttpStatus.NOT_FOUND);

    const catsNamesFormatted = this.formatCatsNames(deliveryData.cats);
    const totalPrice = this.calculateTotalPrice(deliveryData.cats);
    const freeGift = this.isEligibleForFreeGift(totalPrice);

    return {
      title: `Your next delivery for ${catsNamesFormatted}`,
      message: `Hey ${deliveryData.firstName}! In two days' time, we'll be charging you for your next order for ${catsNamesFormatted}'s fresh food.`,
      totalPrice,
      freeGift,
    };
  }

  private formatCatsNames(cats: Delivery['cats']): string {
    let namesString: string = '';

    if (cats.length === 1) {
      return cats[0].name;
    } else {
      cats.forEach((cat, index) => {
        if (index === cats.length - 2) {
          namesString += `${cat.name} `;
        } else if (index === cats.length - 1) {
          namesString += `and ${cat.name}`;
        } else {
          namesString += `${cat.name}, `;
        }
      });
    }

    return namesString;
  }

  private calculateTotalPrice(cats: Delivery['cats']): number {
    let totalPrice: number = 0;
    cats.forEach((cat) => {
      const pouchPrice = POUCH_PRICES[cat.pouchSize];
      if (cat.subscriptionActive) totalPrice += pouchPrice;
    });
    return totalPrice;
  }

  private isEligibleForFreeGift(totalPrice: number): boolean {
    return totalPrice > 120;
  }
}
