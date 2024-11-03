import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {

    process(res: any) {
        let output = {};
        let response = res[0].return;

        console.log('eee',response);
        if (response.success.$value == 'true') {
            output = this.processSuccess(response);
        } else {
            output = this.processError(response);
        }

        return output;

    }

    private processSuccess(response: any) {
        let dataResult = {};
        let output = {
            success: true,
            code: response.code.$value,
            message: response.message.$value,
            data: {},
        };

        if (response.hasOwnProperty('data')) {
            for (const property in response.data) {
                if (property == 'attributes') {
                    continue;
                }
                dataResult[property] = response.data[property].$value;
            }
            output['data'] = dataResult;
        }

        return output;
    }

    private processError(response: any) {
        let errorDetails = {};
        let output = {
            success: false,
            code: response.code.$value,
            message: response.message.$value,
            data: {},
        };


        if (response.hasOwnProperty('errors_details')) {
            for (const property in response.errors_details) {
                if (property == 'attributes') {
                    continue;
                }
                errorDetails[property] = response.errors_details[property].item.$value;
            }
            output['errors_details'] = errorDetails;
        }

        return output;
    }
}