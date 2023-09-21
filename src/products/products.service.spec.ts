import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertProduct', () => {
    it('should insert a Product', () => {
      const product = service.insertProduct('Test', 'A test product', 19.99);
      expect(product.id).toBeDefined();
    });
  });

  describe('getProducts', () => {
    it('should return all products', () => {
      const products = service.getProducts();
      expect(products).toBeDefined();
    });
  });

  describe('updateProduct', () => {
    it('should update a product', () => {
      const product = service.insertProduct('Test', 'A test product', 19.99);
      const updatedProduct = service.updateProduct(
        product.id,
        'Test 2',
        'A test product',
        19.99,
      );
      expect(updatedProduct.title).toEqual('Test 2');
    });
  });

  describe('removeProduct', () => {
    it('should remove a product', () => {
      const product = service.insertProduct('Test', 'A test product', 19.99);
      service.removeProduct(product.id);
      const products = service.getProducts();
      expect(products.length).toEqual(0);
    });
  });
});
