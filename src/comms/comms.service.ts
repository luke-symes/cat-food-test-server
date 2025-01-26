import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeliveryResponse } from 'src/comms/types/delivery-response';
import {
  DeliveriesSchema,
  DeliveriesSchemaType,
  DeliverySchemaType,
} from 'src/lib/delivery/schema/delivery';
import { POUCH_PRICES } from 'src/constants/pouch-prices';
import * as fs from 'node:fs';

@Injectable()
export class CommsService {
  getNextDelivery(userId: string): DeliveryResponse {
    const jsonData = this.readJson();
    const validatedData = this.validateJson(jsonData);
    const deliveryData = this.findDelivery(validatedData, userId);

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

  private formatCatsNames(cats: DeliverySchemaType['cats']): string {
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

  private calculateTotalPrice(cats: DeliverySchemaType['cats']): number {
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

  private readJson(): unknown {
    const jsonString = fs.readFileSync('data.json', 'utf-8');
    return JSON.parse(jsonString);
  }

  private validateJson(json: unknown): DeliveriesSchemaType {
    const validation = DeliveriesSchema.safeParse(json);
    if (!validation.success) {
      console.error(
        `Validation of JSON failed: ${JSON.stringify(validation.error.issues)}`,
      );
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return validation.data;
  }

  private findDelivery(data: DeliveriesSchemaType, userId: string) {
    const deliveryData = data.find((delivery) => delivery.id === userId);

    if (!deliveryData)
      throw new HttpException('No order found', HttpStatus.NOT_FOUND);

    return deliveryData;
  }
}
