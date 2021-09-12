import { join } from 'path';
import { createConnections, getRepository, getTreeRepository, Repository, TreeRepository } from 'typeorm';

import { SlugService } from '../core/Utils/slug.service';
import { Category } from '../entities/categories.entity';
import { Product } from '../entities/products.entity';
import { ProductStatus } from '../shared/Enums/products.enum';
import { Category as OldCategory } from './old-entities/categories.entity';
import { Product as OldProduct } from './old-entities/products.entity';

const slugService = new SlugService();

let oldProductRepository: Repository<OldProduct>;
let newProductRepository: Repository<Product>;
let oldCategoryRepository: TreeRepository<OldCategory>;
let newCategoryRepository: TreeRepository<Category>;

async function connectToDatabases() {
  try {
    return await createConnections([
      {
        name: 'new',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: '123456',
        database: 'olympicbooks-2',
        entities: [join(__dirname, '../entities/**.entity{.ts,.js}')]
      },
      {
        name: 'old',
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: '123456',
        database: 'olympicbooks-clone-prod',
        entities: [join(__dirname, './old-entities/**.entity{.ts,.js}')]
      }
    ]);
  } catch (error) {
    console.log(error);
  }
}

function innitRepositories() {
  oldProductRepository = getRepository(OldProduct, 'old');
  newProductRepository = getRepository(Product, 'new');

  oldCategoryRepository = getTreeRepository(OldCategory, 'old');
  newCategoryRepository = getTreeRepository(Category, 'new');
}

function createSlugForCategories(categories: Category[]): Category[] {
  for (const category of categories) {
    category.slug = slugService.createSlug(category.title, category.id);
    category.children = createSlugForCategories(category.children);
  }
  return categories;
}

async function migrateCategories() {
  console.log('Migrating categories');

  const oldCategoryTree = await oldCategoryRepository.findTrees();

  const newCategoryTree = await newCategoryRepository.save(oldCategoryTree);
  await newCategoryRepository.save(createSlugForCategories(newCategoryTree));
}

async function migrateProducts() {
  console.log('Migrating products');

  const oldProducts = await oldProductRepository.find({ order: { id: 'ASC' } });

  for (const oldProduct of oldProducts) {
    const {
      id,
      publicationYear,
      pages,
      weight,
      inStock,
      categoryId,
      category,
      publisherId,
      publisher,
      authors,
      ...others
    } = oldProduct;

    try {
      const newProduct = await newProductRepository.save({
        ...others,
        oldId: id,
        status: inStock ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT,
        category: await newCategoryRepository.findOne({ title: category.title })
      });

      newProduct.slug = slugService.createSlug(newProduct.title, newProduct.id);

      await newProductRepository.save(newProduct);
    } catch (error) {
      console.log(error);
      break;
    }
  }
}

async function run() {
  const connections = await connectToDatabases();
  innitRepositories();

  await migrateCategories();
  await migrateProducts();

  for (const connection of connections) {
    await connection.close();
  }
}

run();

// TODO
// Create attributes and add attributes to new categories
// Create attribute values with value extracted from old product's properties
// Add attribute values to new products
// Migrate product with deleted category? -> Use query builder?
