import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';

import { CloudStorageService } from '../core/Utils/cloud-storage.service';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Category } from '../entities/categories.entity';
import { File } from '../shared/Interfaces/file.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: TreeRepository<Category>,
    @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>,
    private cloudStorageService: CloudStorageService
  ) {}

  async getCategoryAncestorsAndDescendants(category: Category): Promise<Category> {
    await this.categoryRepository.findDescendantsTree(category);
    category.parents = await this.categoryRepository
      .createAncestorsQueryBuilder('category', 'categoryClosure', category)
      .orderBy('category.id', 'ASC')
      .getMany();
    if (!category.children.length) category.isLeaf = true;
    return category;
  }

  setLeaf(categories: Category[]): Category[] {
    for (const category of categories) {
      if (!category.children.length) category.isLeaf = true;
      else {
        category.children = this.setLeaf(category.children);
      }
    }
    return categories;
  }

  async uploadFile(uploadedFile: File): Promise<any> {
    return await this.cloudStorageService.uploadFile(uploadedFile, '/categories');
  }

  async removeFile(fileName: string): Promise<void> {
    await this.cloudStorageService.removeFile(fileName);
  }
}
