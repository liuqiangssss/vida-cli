import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorType } from 'src/common/errorType';
import { BusinessException } from 'src/common/exception';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    // throw errorType.LOGIN_INFO_ERROR;
    throw new BusinessException('用户名或密码错误', 10002, 403);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
