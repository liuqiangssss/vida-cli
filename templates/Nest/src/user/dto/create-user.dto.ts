import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @Length(6, 20, {
    message: '密码长度为6-20位',
  })
  password: string;
}
