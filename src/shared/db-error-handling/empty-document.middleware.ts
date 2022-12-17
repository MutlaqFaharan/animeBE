import { HttpException, HttpStatus } from '@nestjs/common';
import { Document } from 'mongoose';
import { sharedErrorsTranslationPath } from '../constants/dto-translation';
/**
 * #### throw error if the document is empty
 *
 * @param document MongoDb Document
 * @param name Name of the Collection that document belongs to
 */
export function emptyDocument<T>(document: T, name: string): void {
  if (!document || (document as T[])?.length < 1) {
    throw new HttpException(
      sharedErrorsTranslationPath + '.' + name,
      HttpStatus.NOT_FOUND,
    );
  }
}
