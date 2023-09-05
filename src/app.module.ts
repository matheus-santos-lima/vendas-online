import { Module } from '@nestjs/common';
import { SendgridModule } from './app/sendgrid/sendgrid.module';


@Module({
  imports: [SendgridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
