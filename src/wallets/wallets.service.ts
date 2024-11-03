import { Inject, Injectable } from '@nestjs/common';
import { CheckBalanceWalletDto } from './dto/checkBalance-wallet.dto';
import { ReloadWalletDto } from './dto/reload-wallet.dto';
import { Client } from 'nestjs-soap';

@Injectable()
export class WalletsService {

  constructor(
    @Inject('WalletServiceSoap') private readonly walletServiceSoap: Client,
  ) { }

  async getFunds(checkBalanceWalletDto: CheckBalanceWalletDto) {

    let { document, phone } = { ...checkBalanceWalletDto }
    return await this.walletServiceSoap.getFundsAsync({ document, phone });
  }

  async reload(realodWalletDto: ReloadWalletDto) {
    let { document, phone, amount } = { ...realodWalletDto }
    return await this.walletServiceSoap.reloadAsync({ document, phone, amount });
  }

}
