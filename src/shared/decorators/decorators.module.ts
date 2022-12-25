import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/system-users/user/user.module';
import {
  CustomEmailValidation,
  CustomExistEmailValidation,
  CustomPhoneNumberValidation,
  CustomUsernameValidation,
} from './validation/unique-property.decorator';

@Module({
  controllers: [],
  providers: [
    CustomEmailValidation,
    CustomPhoneNumberValidation,
    CustomExistEmailValidation,
    CustomUsernameValidation,
  ],
  imports: [UserModule],
  exports: [
    CustomEmailValidation,
    CustomPhoneNumberValidation,
    CustomExistEmailValidation,
    CustomUsernameValidation,
  ],
})
export class DecoratorsModule {}
