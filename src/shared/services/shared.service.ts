import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  SettingDto, TokenDto,
  UserDto, MessageDto, MessageTypeEnum
} from 'src/shared/models';
@Injectable()
export class SharedService {
  user: UserDto;
  token: TokenDto;
  settings: SettingDto;
  isUserAuthenticated = false;
  onHttpRequestError = new EventEmitter<any>();
  onSpinnerToggle = new EventEmitter<boolean>();
  onMessageSuccess = new EventEmitter<MessageDto>();
  onMessageError = new EventEmitter<MessageDto>();
  onMessageWarning = new EventEmitter<MessageDto>();
  onMessageInfo = new EventEmitter<MessageDto>();
  constructor() {

  }
  showSpinner() {
    this.onSpinnerToggle.next(true);
  }
  hideSpinner() {
    this.onSpinnerToggle.next(false);
  }
  messageSuccess(message: string, actionTitle?: string, duration?: number) {
    this.onMessageSuccess.emit(new MessageDto(message, actionTitle, duration));
  }
  messageError(message: string, actionTitle?: string, duration?: number) {
    this.onMessageError.emit(new MessageDto(message, actionTitle, duration));
  }
  messageWarning(message: string, actionTitle?: string, duration?: number) {
    this.onMessageWarning.emit(new MessageDto(message, actionTitle, duration));
  }
  messageInfo(message: string, actionTitle?: string, duration?: number) {
    this.onMessageInfo.emit(new MessageDto(message, actionTitle, duration));
  }
  showMessage(messageDto: MessageDto) {
    switch (messageDto.Type) {
      case MessageTypeEnum.Info: {
        this.onMessageInfo.emit(messageDto);
        break;
      }
      case MessageTypeEnum.Success: {
        this.onMessageSuccess.emit(messageDto);
        break;
      }
      case MessageTypeEnum.Error: {
        this.onMessageError.emit(messageDto);
        break;
      }
      case MessageTypeEnum.Warning: {
        this.onMessageWarning.emit(messageDto);
        break;
      }
      default: {
        this.onMessageInfo.emit(messageDto);
      }
    }
  }
  updateUrlToApiServer(url: string): string {
    const newUrl = `${environment.apiServerAddress}${url}`;
    return newUrl;
  }
}
