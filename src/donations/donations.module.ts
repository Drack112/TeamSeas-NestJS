import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';

@Module({
  providers: [PrismaService, DonationsResolver, DonationsService],
})
export class DonationsModule {}
