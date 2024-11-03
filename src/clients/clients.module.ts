import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SoapModule } from 'nestjs-soap';
import { ResponseHelper } from 'src/response.helper';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ResponseHelper],
  imports: [
    SoapModule.register({
      clientName: 'ClientServiceSoap',
      uri: 'http://localhost:8000/api/v1/clients/soap/wsdl',
    }),
  ],
})
export class ClientsModule {}
