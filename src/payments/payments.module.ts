import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ResponseHelper } from 'src/response.helper';
import { SoapModule } from 'nestjs-soap';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, ResponseHelper],
  imports: [
    SoapModule.register({
      clientName: 'PaymentServiceSoap',
      uri: 'http://localhost:8000/api/v1/payments/soap/wsdl',
    }),
  ],
})
export class PaymentsModule {}
