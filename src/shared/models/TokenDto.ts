import { UserDto } from 'src/shared/models';
export interface TokenDto {
    access_token: string;
    token_type: string;
    expires_in: number;
    username: string;
    issued_time: Date;
    user: UserDto;
    Roles: string[];
    Claims: string[];
}
export interface AuthFaliedDto {
    error: string;
    error_description: string;
}
