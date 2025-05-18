import { Module } from '@nestjs/common';
import { RefferalsService } from './refferals.service';
import { RefferalsController } from './refferals.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[PrismaModule, AuthModule],
  providers: [RefferalsService],
  controllers: [RefferalsController],
  exports:[RefferalsService]
})
export class RefferalsModule {}
