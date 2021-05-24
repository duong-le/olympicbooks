import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getMany(): Promise<Category[]> {
    const categories = await this.categoryRepository.findTrees();
    return this.setLeaf(categories);
  }

  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    await this.categoryRepository.findDescendantsTree(category);
    category.parent = (await this.categoryRepository
      .createAncestorsQueryBuilder('category', 'categoryClosure', category)
      .orderBy('category.id', 'ASC')
      .getMany()) as any;
    if (!category.children.length) category.isLeaf = true;
    return category;
  }

  async createOne(dto: CreateCategoryDto, uploadedFile: File): Promise<Category> {
    let parent: Category;
    let category: Category;
    const { parentId, ...others } = dto;

    if (uploadedFile) {
      const file = await this.uploadFile(uploadedFile);
      category = this.categoryRepository.create({ ...others, imgUrl: file.publicUrl, imgName: file.name });
    } else category = this.categoryRepository.create(others);

    if (parentId) {
      parent = await this.categoryRepository.findOne(parentId);
      if (!parent) throw new NotFoundException('Parent category not found!');
      category.parent = parent;
    }
    return await this.categoryRepository.save(category);
  }

  async updateOne(id: number, dto: UpdateCategoryDto, uploadedFile: File): Promise<Category> {
    const category = await this.getOne(id);
    if (dto?.title) category.title = dto.title;

    if (uploadedFile) {
      if (category.imgName) await this.removeFile(category.imgName);
      const file = await this.uploadFile(uploadedFile);
      category.imgUrl = file.publicUrl;
      category.imgName = file.name;
    }
    // if (dto?.parentId) {
    //   const parent = await this.getOne(dto.parentId);
    //   category.parent = parent;
    // }
    return await this.categoryRepository.save(category);
  }

  async deleteOne(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id, { relations: ['products'] });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    await this.categoryRepository.softDelete(id);
    if (category.imgUrl && category.imgName) await this.removeFile(category.imgName);
  }

  async getPublishersByCategory(id: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.products', 'products')
      .innerJoinAndSelect('products.publisher', 'publisher')
      .where('category.id = :id', { id })
      .select('publisher.name AS name')
      .addSelect('COUNT(*) AS count')
      .groupBy('publisher.name')
      .getRawMany();
  }

  async getAuthorsByCategory(id: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .innerJoinAndSelect('category.products', 'products')
      .innerJoinAndSelect('products.authors', 'authors')
      .where('category.id = :id', { id })
      .select('authors.name AS name')
      .addSelect('COUNT(*) AS count')
      .groupBy('authors.name')
      .getRawMany();
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
