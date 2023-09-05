import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';

@Controller('api/v1/sendgrid')
export class SendgridController {
        constructor(private readonly sendgridService:SendgridService) {}

    @Post()    async sendEmail(@Body() Body ) {
        return this.sendgridService.sendEmail(Body);
    }
}
