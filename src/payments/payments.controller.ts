import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { ResponseHelper } from 'src/response.helper';

@Controller('api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService, private readonly responseHelper: ResponseHelper) { }

  @Post('pay')
  async pay(@Body() createPaymentDto: CreatePaymentDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let jsonResponse: any = {};

    try {
      const result = await this.paymentsService.pay(createPaymentDto);

      if (result !== null && result !== undefined) {
        jsonResponse = this.responseHelper.process(result);
      } else {
        jsonResponse['error'] = true;
        jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
        jsonResponse['message'] = 'Error to invoke function soap';
      }
    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message')
        ? error.message
        : 'Ha ocurrido un error interno';
      jsonResponse['error_details'] = {};
      jsonResponse['data'] = {};
    }

    return response.status(jsonResponse.code).json(jsonResponse);
  }

  @Post('confirm')
  async confirm(@Body() confirmPaymentDto: ConfirmPaymentDto,
    @Req() request: Request,
    @Res() response: Response,) {

    let jsonResponse: any = {};

    try {
      const result = await this.paymentsService.confirm(confirmPaymentDto);

      if (result !== null && result !== undefined) {
        jsonResponse = this.responseHelper.process(result);
      } else {
        jsonResponse['error'] = true;
        jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
        jsonResponse['message'] = 'Error to invoke function soap';
      }
    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message')
        ? error.message
        : 'Ha ocurrido un error interno';
      jsonResponse['error_details'] = {};
      jsonResponse['data'] = {};
    }

    return response.status(jsonResponse.code).json(jsonResponse);
  }

}
