import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../controllers/admin/categories/categories.dto';
import { Category } from '../entities/categories.entity';
import { File } from '../shared/Interfaces/file.interface';
import { CloudStorageService } from './cloud-storage.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: TreeRepository<Category>,
    private cloudStorageService: CloudStorageService
  ) {}

  async getCategoryAncestorAndDescendants(category: Category): Promise<Category> {
    await this.categoryRepository.findDescendantsTree(category);
    category.parent = (await this.categoryRepository
      .createAncestorsQueryBuilder('category', 'categoryClosure', category)
      .orderBy('category.id', 'ASC')
      .getMany()) as any;
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
