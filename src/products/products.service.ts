import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): Product {
    const prodId = uuidv4();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(prodId: string): Product {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number,
  ): Product {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }

  removeProduct(prodId: string) {
    const [_, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }
}
