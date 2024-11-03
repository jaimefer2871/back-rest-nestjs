import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';

import { Client } from 'nestjs-soap';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('ClientServiceSoap') private readonly clientServiceSoap: Client,
  ) { }

  async register(createClientDto: CreateClientDto) {
    let { document, name, email, phone } = { ...createClientDto }
    return await this.clientServiceSoap.registerAsync({ document, name, email, phone });
  }
}
