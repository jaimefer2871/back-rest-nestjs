import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { SoapModule } from 'nestjs-soap';
import { ResponseHelper } from 'src/response.helper';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, ResponseHelper],
  imports: [
    SoapModule.register({
      clientName: 'WalletServiceSoap',
      uri: 'http://localhost:8000/api/v1/wallets/soap/wsdl',
    }),
  ],
})
export class WalletsModule {}
