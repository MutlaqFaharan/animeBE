import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = args.object[relatedPropertyName]; // original value (decorator)
    return value === relatedValue;
  }
}

/**
 * ### Custom validate decorator to match any two properties with each other
 * @param property the original property that you want to match with
 * @param validationOptions class-validator options
 * @returns weather they match or not (true/false)
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

export function EqualsEnum(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class EqualsEnumConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    return value in Role;
  }
}
