import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './sendgrid.service';
import { HttpService } from '@nestjs/axios';
import { SendEmailInterface } from '../interface/send-email-interface';
import { of } from 'rxjs';


describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with success', async () => {
      //  Arrange
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'Matheus',
                email: 'matheuspolaka81@gmail.com',
              },
            ],
          },
        ],

        from: {
          email: 'matheuspolaka123@outlook.com',
          name: 'Contato | TRACON',
        },
        reply_to: {
          email: 'suporteheadcore123@outlook.com',
          name: 'Suporte | TRACON',
        },

        subject: 'Sua fatura chegou!',

        content: [
          {
            type: 'text/html',
            value: '<p>Sua fatura chegou!</p>',
          },
        ],
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(of({ 
          status: 202, 
          statusText: 'ACCEPTED', 
          config: {} as any, 
          headers: {}, 
          data: '' 
        }));

      //  Act  
      const result = await sendGridService.sendEmail(data);

      //  Assert
      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});


