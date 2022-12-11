import { HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { checkNullability } from '../util/check-nullability.util';
/**
 * ### check if the ID of the Document follows MongoDB's Rules for IDs
 *
 * @param documentID any Mongo DB ID
 */
export const validID = (documentID: mongoose.Schema.Types.ObjectId): void => {
  if (!mongoose.isValidObjectId(documentID) && checkNullability(documentID)) {
    throw new HttpException(
      `common.errors.invalidMongoDBID`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
