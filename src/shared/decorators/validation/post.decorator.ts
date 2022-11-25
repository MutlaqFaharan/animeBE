import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

@ValidatorConstraint({ name: 'PostValidation' })
export class PostValidationConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = args.object[relatedPropertyName]; // original value (decorator)
    return value === relatedValue;
  }
}

/**
 * ### Custom validate decorator to check if a post has at least one of the following
 * text, video, or an image
 * @param validationOptions class-validator options
 * @returns weather the validation returns true or not (true/false)
 */
export function PostValidation(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PostValidationConstraint,
    });
  };
}
