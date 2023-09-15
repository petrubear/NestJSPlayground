import { ApiProperty } from '@nestjs/swagger';

export class Product {
  public id: string;

  @ApiProperty({
    example: 'Apple iPad Pro 2020',
    description: 'The title of the Product',
  })
  public title: string;

  @ApiProperty({
    example: 'Apple iPad Pro 2020, 512 Gb, Wi-Fi + Cellular (Space Gray)',
    description: 'The description of the Product',
    name: 'description',
  })
  public desc: string;

  @ApiProperty({
    example: '$800',
    description: 'The price of the Product',
  })
  public price: number;

  constructor(id: string, title: string, desc: string, price: number) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.price = price;
  }
}
