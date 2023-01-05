import {
  Controller,
  Get,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { BooksDto } from './books.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listbooks() {
    const [rows] = await db.execute('SELECT title, rating FROM books ORDER BY rating DESC ');
    return {
      books: rows,
    };
  }
  
  @Get('/keres')
  @Render('list')
  async cicaSearch(@Query('ertekeles') ertekeles: string)  {
    const [rows] = await db.execute(
      'SELECT title, rating FROM books WHERE rating LIKE ?',[ertekeles],
    );
  
    return { books: rows };
  }

}
