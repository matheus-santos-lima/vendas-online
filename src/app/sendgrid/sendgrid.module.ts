import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],  
  providers: [SendgridService],
})
export class SendgridModule {}
