import { join } from 'path';
import { Connection, createConnections, getRepository, getTreeRepository, Repository, TreeRepository } from 'typeorm';

import { SlugService } from '../core/Utils/slug.service';
import { Admin } from '../entities/admins.entity';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Attribute } from '../entities/attribute.entity';
import { Category } from '../entities/categories.entity';
import { Customer } from '../entities/customers.entity';
import { Product } from '../entities/products.entity';
import { AttributeInputMode } from '../shared/Enums/attributes.enum';
import { ProductStatus } from '../shared/Enums/products.enum';
import { Author } from './old-entities/authors.entity';
import { Category as OldCategory } from './old-entities/categories.entity';
import { Product as OldProduct } from './old-entities/products.entity';
import { Publisher } from './old-entities/publishers.entity';
import { Role, User } from './old-entities/users.entity';

const slugService = new SlugService();

let oldProductRepository: Repository<OldProduct>;
let newProductRepository: Repository<Product>;
let oldCategoryRepository: TreeRepository<OldCategory>;
let newCategoryRepository: TreeRepository<Category>;
let attributeRepository: Repository<Attribute>;
let attributeValueRepository: Repository<AttributeValue>;
let userRepository: Repository<User>;
let customerRepository: Repository<Customer>;
let adminRepository: Repository<Admin>;

async function connectToDatabases() {
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
}

function innitRepositories() {
  oldProductRepository = getRepository(OldProduct, 'old');
  newProductRepository = getRepository(Product, 'new');

  oldCategoryRepository = getTreeRepository(OldCategory, 'old');
  newCategoryRepository = getTreeRepository(Category, 'new');

  attributeRepository = getRepository(Attribute, 'new');
  attributeValueRepository = getRepository(AttributeValue, 'new');

  userRepository = getRepository(User, 'old');
  customerRepository = getRepository(Customer, 'new');
  adminRepository = getRepository(Admin, 'new');
}

async function migrateAttributes() {
  return await attributeRepository.save([
    { name: 'Năm xuất bản' },
    { name: 'Số trang' },
    { name: 'Cân nặng (grams)' },
    { name: 'Nhà xuất bản' },
    { name: 'Tác giả', inputMode: AttributeInputMode.MULTIPLE }
  ]);
}

function createSlugAndAttributeForCategories(categories: Category[], attributes: Attribute[]): Category[] {
  for (const category of categories) {
    category.slug = slugService.createSlug(category.title, category.id);
    category.attributes = attributes;
    category.children = createSlugAndAttributeForCategories(category.children, attributes);
  }
  return categories;
}

async function migrateCategories(attributes: Attribute[]) {
  console.log('Migrating categories');

  const oldCategoryTree = await oldCategoryRepository.findTrees();

  const newCategoryTree = await newCategoryRepository.save(oldCategoryTree);
  await newCategoryRepository.save(createSlugAndAttributeForCategories(newCategoryTree, attributes));
}

async function getProductAttributeValues(
  attributes: Attribute[],
  publicationYear: number,
  pages: number,
  weight: number,
  publisher: Publisher,
  authors: Author[]
): Promise<AttributeValue[]> {
  const productAttributeValues: AttributeValue[] = [];

  for (const attribute of attributes) {
    let attributeValueNames = [];
    switch (attribute.name) {
      case 'Năm xuất bản':
        attributeValueNames = [String(publicationYear)];
        break;
      case 'Số trang':
        attributeValueNames = [String(pages)];
        break;
      case 'Cân nặng (grams)':
        attributeValueNames = [String(weight)];
        break;
      case 'Nhà xuất bản':
        attributeValueNames = [publisher.name];
        break;
      case 'Tác giả':
        attributeValueNames = authors.map((author) => author.name);
        break;
    }

    for (const attributeValueName of attributeValueNames) {
      const attributeValue = await attributeValueRepository.findOne({
        name: attributeValueName,
        attributeId: attribute.id
      });

      productAttributeValues.push(
        attributeValue ||
          (await attributeValueRepository.save({
            name: attributeValueName,
            attributeId: attribute.id
          }))
      );
    }
  }

  return productAttributeValues;
}

async function migrateProducts(attributes: Attribute[]) {
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

    const newProduct = await newProductRepository.save({
      ...others,
      oldId: id,
      status: inStock ? ProductStatus.ACTIVE : ProductStatus.SOLD_OUT,
      category: await newCategoryRepository.findOne({ title: category.title })
    });

    newProduct.slug = slugService.createSlug(newProduct.title, newProduct.id);
    newProduct.attributeValues = await getProductAttributeValues(
      attributes,
      publicationYear,
      pages,
      weight,
      publisher,
      authors
    );
    await newProductRepository.save(newProduct);
  }
}

async function migrateUsers() {
  console.log('Migrating users');

  const users = await userRepository.find({ order: { id: 'ASC' } });
  for (const user of users) {
    const {
      id,
      name,
      email,
      hashedPassword,
      isBlock,
      address,
      phoneNumber,
      role,
      createdAt,
      updatedAt,
      ...others
    } = user;

    if (role === Role.CUSTOMER) {
      const customer = await customerRepository.save({
        createdAt,
        updatedAt,
        name,
        email,
        hashedPassword,
        isBlock,
        address,
        phoneNumber
      });
    } else if (role === Role.ADMIN) {
      const admin = await adminRepository.save({
        createdAt,
        updatedAt,
        name,
        email,
        hashedPassword,
        isBlock
      });
    }
  }
}

async function validateProduct() {
  const oldProducts = await oldProductRepository.find({ order: { id: 'ASC' } });
  const invalidProductURLs = [];
  for (const oldProduct of oldProducts) {
    if (
      !oldProduct.publicationYear ||
      !oldProduct.weight ||
      !oldProduct.pages ||
      !oldProduct.publisher ||
      !oldProduct.authors.length ||
      !oldProduct.category
    )
      invalidProductURLs.push(`https://dashboard.olympicbooks.com/products/${oldProduct.id}`);
  }

  if (invalidProductURLs.length) {
    console.log(invalidProductURLs.join('\n'));
    throw new Error('Product is invalid');
  }
}

async function run() {
  let connections: Connection[] = [];
  try {
    connections = await connectToDatabases();
    innitRepositories();
    await validateProduct();

    const attributes = await migrateAttributes();
    await migrateCategories(attributes);
    await migrateProducts(attributes);
    await migrateUsers();
  } catch (error) {
    console.log(error);
  } finally {
    for (const connection of connections) {
      await connection.close();
    }
  }
}

run();
