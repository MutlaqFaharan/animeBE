import { Module } from '@nestjs/common';
import { SystemUsersModule } from 'src/modules/system-users/system-users.module';
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
  imports: [SystemUsersModule],
  exports: [
    CustomEmailValidation,
    CustomPhoneNumberValidation,
    CustomExistEmailValidation,
    CustomUsernameValidation,
  ],
})
export class DecoratorsModule {}
