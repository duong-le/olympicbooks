import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  createSlug(string: string, suffix: string | number = null): string {
    let slug = slugify(string, {
      replacement: '-', // replace spaces with replacement character
      lower: true, // convert to lower case
      strict: true, // strip special characters except replacement
      locale: 'vi', // language code of the locale to use
      trim: true // trim leading and trailing replacement chars
    });

    if (suffix) slug = `${slug}-${suffix}`;

    return slug;
  }
}
