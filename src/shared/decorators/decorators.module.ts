import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemUsersModule } from 'src/modules/system-users/system-users.module';
import { UserSchema } from 'src/modules/system-users/user/entities/user.entity';
import { CustomPasswordMatchValidation } from './validation/match-old-property.decorator';
import { MatchConstraint } from './validation/match.decorator';
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
    CustomPasswordMatchValidation,
    CustomUsernameValidation,
    MatchConstraint,
  ],
  imports: [SystemUsersModule],
  exports: [
    CustomEmailValidation,
    CustomPhoneNumberValidation,
    CustomExistEmailValidation,
    CustomPasswordMatchValidation,
    CustomUsernameValidation,
    MatchConstraint,
  ],
})
export class DecoratorsModule {}
