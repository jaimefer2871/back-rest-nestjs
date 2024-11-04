import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { Client } from 'nestjs-soap';

@Injectable()
export class PaymentsService {

  constructor(
    @Inject('PaymentServiceSoap') private readonly paymentServiceSoap: Client,
  ) { }

  async pay(createPaymentDto: CreatePaymentDto) {
    let { document, phone, amount } = { ...createPaymentDto }
    return await this.paymentServiceSoap.payAsync({ document, phone, amount });
  }

  async confirm(confirmPaymentDto: ConfirmPaymentDto) {
    let { sessionId, token } = { ...confirmPaymentDto }
    return await this.paymentServiceSoap.confirmAsync({ sessionId, token });
  }
}
