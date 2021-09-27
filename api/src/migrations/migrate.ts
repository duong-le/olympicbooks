import { join } from 'path';
import { Connection, createConnections, getRepository, getTreeRepository, Repository, TreeRepository } from 'typeorm';

import { SlugService } from '../core/Utils/slug.service';
import { Admin } from '../entities/admins.entity';
import { AttributeValue } from '../entities/attribute-value.entity';
import { Attribute } from '../entities/attribute.entity';
import { CartItem } from '../entities/carts.entity';
import { Category } from '../entities/categories.entity';
import { Customer } from '../entities/customers.entity';
import { OrderItem } from '../entities/orders-item.entity';
import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';
import { AttributeInputMode } from '../shared/Enums/attributes.enum';
import { ProductStatus } from '../shared/Enums/products.enum';
import { Author } from './old-entities/authors.entity';
import { CartItem as OldCartItem } from './old-entities/carts.entity';
import { Category as OldCategory } from './old-entities/categories.entity';
import { OrderItem as OldOrderItem } from './old-entities/orders-item.entity';
import { Order as OldOrder } from './old-entities/orders.entity';
import { Product as OldProduct } from './old-entities/products.entity';
import { Publisher } from './old-entities/publishers.entity';
import { Role, User } from './old-entities/users.entity';

let connections: Connection[] = [];
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
let oldCartItemRepository: Repository<OldCartItem>;
let newCartItemRepository: Repository<CartItem>;
let oldOrderRepository: Repository<OldOrder>;
let newOrderRepository: Repository<Order>;
let oldOrderItemRepository: Repository<OldOrderItem>;
let newOrderItemRepository: Repository<OrderItem>;

function logProgress(string: string) {
  process.stdout.moveCursor(0, -1); // up one line
  process.stdout.clearLine(1); // from cursor to end
  console.log(string);
}

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

  oldCartItemRepository = getRepository(OldCartItem, 'old');
  newCartItemRepository = getRepository(CartItem, 'new');

  oldOrderRepository = getRepository(OldOrder, 'old');
  newOrderRepository = getRepository(Order, 'new');

  oldOrderItemRepository = getRepository(OldOrderItem, 'old');
  newOrderItemRepository = getRepository(OrderItem, 'new');
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
  const oldProducts = await oldProductRepository.find({ order: { id: 'ASC' } });
  console.log(`Migrating ${oldProducts.length} products...\n`);

  for (let i = 0; i < oldProducts.length; i++) {
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
    } = oldProducts[i];

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

    logProgress(`${i + 1}/${oldProducts.length}`);
  }
}

async function migrateUsers() {
  const users = await userRepository.find({
    order: { id: 'ASC' },
    relations: ['orders']
  });
  console.log(`Migrating ${users.length} users...\n`);

  for (let i = 0; i < users.length; i++) {
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
      deletedAt,
      cartItems,
      orders
    } = users[i];

    logProgress(`${i + 1}/${users.length}`);

    if (role === Role.CUSTOMER) {
      const customer = await customerRepository.save({
        createdAt,
        updatedAt,
        name,
        email,
        hashedPassword,
        isBlock,
        address,
        phoneNumber,
        oldId: id,
        cartItems: []
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

async function migrateCartItems() {
  const cartItems = await oldCartItemRepository.find({
    order: { id: 'ASC' }
  });
  console.log(`Migrating ${cartItems.length} cart items...\n`);

  for (let i = 0; i < cartItems.length; i++) {
    await newCartItemRepository.save({
      createdAt: cartItems[i].createdAt,
      updatedAt: cartItems[i].updatedAt,
      quantity: cartItems[i].quantity,
      customer: await customerRepository.findOne({ oldId: cartItems[i].userId }),
      product: await newProductRepository.findOne({ oldId: cartItems[i].productId })
    });

    logProgress(`${i + 1}/${cartItems.length}`);
  }
}

async function migrateOrders() {
  const orders = await oldOrderRepository.find({
    order: { id: 'ASC' }
  });
  console.log(`Migrating ${orders.length} orders...\n`);

  for (let i = 0; i < orders.length; i++) {
    const {
      id,
      createdAt,
      updatedAt,
      deletedAt,
      buyerNote,
      sellerNote,
      userId,
      discountId,
      transactionId,
      shippingId,
      discount,
      transaction,
      shipping,
      orderItems
    } = orders[i];

    const newOrderItems: OrderItem[] = [];

    for (const oldOrderItem of orderItems) {
      newOrderItems.push(
        newOrderItemRepository.create({
          createdAt: oldOrderItem.createdAt,
          updatedAt: oldOrderItem.updatedAt,
          quantity: oldOrderItem.quantity,
          totalValue: oldOrderItem.totalValue,
          productTitle: oldOrderItem.productTitle,
          product: await newProductRepository.findOne({ oldId: oldOrderItem.productId })
        })
      );
    }

    const customer = await customerRepository.findOne({ oldId: userId });

    logProgress(`${i + 1}/${orders.length}`);

    await newOrderRepository.save({
      createdAt,
      updatedAt,
      buyerNote,
      sellerNote,
      customerId: customer.id,
      transaction: {
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        transactionMethodId: transaction.transactionMethodId,
        state: transaction.state.toLowerCase() as any,
        value: transaction.value
      },
      shipping: {
        createdAt: shipping.createdAt,
        updatedAt: shipping.updatedAt,
        name: shipping.name,
        address: shipping.address,
        phoneNumber: shipping.phoneNumber,
        state: shipping.state.toLowerCase() as any,
        code: shipping.code,
        fee: shipping.fee,
        deliveryDate: shipping.deliveryDate,
        shippingMethodId: shipping.shippingMethodId
      },
      orderItems: newOrderItems
    });
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
  connections = await connectToDatabases();
  innitRepositories();
  await validateProduct();

  const attributes = await migrateAttributes();
  await migrateCategories(attributes);
  await migrateProducts(attributes);
  await migrateUsers();
  await migrateCartItems();
  await migrateOrders();
}

run()
  .catch((error) => console.log(error))
  .finally(async () => {
    for (const connection of connections) {
      await connection.close();
    }
  });
