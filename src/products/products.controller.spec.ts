import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { NotFoundException } from '@nestjs/common';
import { ProductsModule } from './products.module';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addProduct', () => {
    it('should return a product', () => {
      const product = controller.addProduct('Test', 'Test', 1);
      expect(product).toBeDefined();
    });
  });

  describe('getAllProducts', () => {
    it('should return an array of products', () => {
      const products = controller.getAllProducts();
      expect(products).toBeDefined();
      expect(products.length).toBe(0);
    });
  });

  describe('getProduct', () => {
    it('should return a product', () => {
      const product = controller.addProduct('Test', 'Test', 1);
      const fetched = controller.getProduct(product.id);
      expect(fetched).toBeDefined();
      expect(fetched.id).toBe(product.id);
    });
  });

  describe('updateProduct', () => {
    it('should return a product', () => {
      const product = controller.addProduct('Test', 'Test', 1);
      const updated = controller.updateProduct(product.id, 'Test', 'Test', 1);
      expect(updated).toBeDefined();
      expect(updated.id).toBe(product.id);
    });
  });

  describe('removeProduct', () => {
    it('should throw error', () => {
      const product = controller.addProduct('Test', 'Test', 1);
      controller.removeProduct(product.id);
      try {
        controller.getProduct(product.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
