import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: TreeRepository<Category>) {}

  async getMany(): Promise<Category[]> {
    const categories = await this.categoryRepository.findTrees();
    return this.setLeaf(categories);
  }

  async getOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    await this.categoryRepository.findAncestorsTree(category);
    await this.categoryRepository.findDescendantsTree(category);
    if (!category.children.length) category.isLeaf = true;
    return category;
  }

  async createOne(dto: CreateCategoryDto): Promise<Category> {
    let parent: Category;
    const { parentId, ...others } = dto;
    const category = this.categoryRepository.create(others);

    if (parentId !== 0) {
      parent = await this.categoryRepository.findOne(parentId);
      if (!parent) throw new NotFoundException('Parent category not found!');
      category.parent = parent;
    }
    category.save();
    return category;
  }

  async updateOne(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getOne(id);
    if (dto?.title) category.title = dto.title;
    if (dto?.img) category.img = dto.img;
    if (dto?.parentId) {
      const parent = await this.getOne(dto.parentId);
      category.parent = parent;
    }
    category.save();
    return category;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Category ${id} not found`);
  }

  setLeaf(categories: Category[]): Category[] {
    for (const category of categories) {
      if (!category.children.length) category.isLeaf = true;
      else category.children = this.setLeaf(category.children);
    }
    return categories;
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
}
