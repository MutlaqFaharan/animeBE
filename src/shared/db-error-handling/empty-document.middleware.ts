import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * #### throw error if the document is empty
 *
 * @param document MongoDb Document
 * @param name Name of the Collection that document belongs to
 */
export function emptyDocument<T>(document: T, name: string): void {
  if (!document || (document as T[])?.length < 1) {
    throw new HttpException('' + '.' + name, HttpStatus.NOT_FOUND);
  }
}
