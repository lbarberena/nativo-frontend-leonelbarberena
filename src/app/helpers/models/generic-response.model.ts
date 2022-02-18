/** Receive the generic response of the API */

export interface GenericResponseModel {
    success: boolean;
    msg: string;
    data: any;
}