import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WalletsService } from './wallets.service';
import { CheckBalanceWalletDto } from './dto/checkBalance-wallet.dto';
import { ReloadWalletDto } from './dto/reload-wallet.dto';
import { ResponseHelper } from 'src/response.helper';

@Controller('api/v1/wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService, private readonly responseHelper: ResponseHelper) { }

  @Post('check_balance')
  async getFunds(@Body() checkBalanceWalletDto: CheckBalanceWalletDto, @Req() request: Request, @Res() response: Response) {
    let jsonResponse: any = {};

    try {
      const result = await this.walletsService.getFunds(checkBalanceWalletDto);

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

  @Post("reload")
  async reload(@Body() realodWalletDto: ReloadWalletDto, @Req() request: Request, @Res() response: Response) {
    let jsonResponse: any = {};

    try {
      const result = await this.walletsService.reload(realodWalletDto);

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
