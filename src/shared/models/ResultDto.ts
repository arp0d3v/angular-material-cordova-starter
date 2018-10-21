import { MessageDto } from 'src/shared/models';
export interface ResultDto {
    ResultCode?: number;
    ResultID?: number;
    Model?: any;
    List?: any[];
    Message?: MessageDto;
}
