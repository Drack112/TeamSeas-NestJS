import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { OrderByParams } from '../graphql';
import { DonationsService } from './donations.service';
import { Donation } from './entities/donation.entity';

import { DonationCreateInput } from '../@generated/prisma-nestjs-graphql/donation/donation-create.input';


@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Query(() => [Donation], { name: 'donations' })
  async findAll(
    @Args('orderBy')
    orderBy?: OrderByParams,
  ): Promise<Donation[]> {
    const findAllDonations = await this.donationsService.findAllDonations(
      orderBy,
    );

    return findAllDonations;
  }

  @Query(() => Donation, { name: 'donation' })
  async findOne(@Args('id') id: string): Promise<Donation> {
    const findDonation = await this.donationsService.findOneDonation({ id });
    return findDonation;
  }

  @Mutation(() => Donation, { name: 'createDonation' })
  async createDonation(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput,
  ): Promise<Donation> {
    const createNewDonation = await this.donationsService.createDonation(
      createDonationInput,
    );
    return createNewDonation;
  }

  @Query('totalDonations')
  async totalDontations(): Promise<number> {
    const getTotal = await this.donationsService.getTotal();
    return getTotal;
  }
}
