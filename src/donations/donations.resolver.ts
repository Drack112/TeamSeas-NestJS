import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { OrderByParams } from '../graphql';
import { DonationsService } from './donations.service';
import { Donation } from './entities/donation.entity';

import { DonationCreateInput } from '../@generated/prisma-nestjs-graphql/donation/donation-create.input';

const pubSub = new PubSub();

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

    const total = await this.donationsService.getTotal();
    pubSub.publish('totalUpdated', { totalUpdated: { total } });

    return createNewDonation;
  }

  @Subscription()
  async totalUpdated() {
    return pubSub.asyncIterator('totalUpdated');
  }

  @Query('totalDonations')
  async totalDontations(): Promise<number> {
    const getTotal = await this.donationsService.getTotal();
    return getTotal;
  }
}
