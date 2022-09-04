import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { OrderByParams } from '../graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Donation } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async findAllDonations(orderBy?: OrderByParams): Promise<Donation[]> {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return await this.prisma.donation.findMany({
      orderBy: { [field]: direction },
    });
  }

  async findOneDonation(
    donationWhereUniqueInput: Prisma.DonationWhereUniqueInput,
  ): Promise<Donation> {
    const donation = await this.prisma.donation.findUnique({
      where: donationWhereUniqueInput,
    });

    return donation;
  }

  async createDonation(
    createDonationInput: Prisma.DonationCreateInput,
  ): Promise<Donation> {
    const createNewDonation = await this.prisma.donation.create({
      data: createDonationInput,
    });

    if (!createNewDonation) {
      throw new InternalServerErrorException(
        'Error while creating the donation',
      );
    }

    return createNewDonation;
  }

  async getTotal(): Promise<number> {
    const response = await this.prisma.donation.aggregate({
      _sum: {
        count: true,
      },
    });

    return response._sum.count;
  }
}
