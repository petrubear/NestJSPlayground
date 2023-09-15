import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
  }

  @ApiOperation({ summary: 'Get all Products' })
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @ApiOperation({ summary: 'Get single Product' })
  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getProduct(prodId);
  }

  @ApiOperation({ summary: 'Update Product' })
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }

  @ApiOperation({ summary: 'Delete Product' })
  @Delete(':id')
  removeProduct(@Param('id') prodId: string): void {
    this.productsService.removeProduct(prodId);
  }
}
