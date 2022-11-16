import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { FileResponse } from 'src/shared/interfaces/file-response.interface';
@Injectable()
export class CloudinaryService {
  async uploadPDF(file: Express.Multer.File): Promise<FileResponse> {
    const uploadedFile = await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        result.tags = ['instructor'];
        result.resource_type = 'pdf';
        result.folder = 'Instructors';
        result.public_id = file.originalname;
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
    return {
      message: 'auth.file',
      statusCode: 201,
      url: (uploadedFile as any).secure_url,
    };
  }
}
