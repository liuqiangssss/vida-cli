import { BusinessException } from './exception';

export const errorType = {
  LOGIN_INFO_ERROR: new BusinessException('用户名或密码错误', 10001 ),
};
