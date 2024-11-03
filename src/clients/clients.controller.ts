import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ResponseHelper } from 'src/response.helper';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService, private readonly responseHelper: ResponseHelper) { }

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let jsonResponse:any = {};

    try {
      const result = await this.clientsService.register(createClientDto);

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
