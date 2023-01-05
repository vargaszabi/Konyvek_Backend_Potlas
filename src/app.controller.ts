import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
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

  @Get('books/new')
  @Render('form')
  newBookform() { 
    return {};
  }

  
  @Get('/keres')
  @Render('list')
  async bookSearch(@Query('ertekeles') ertekeles: string)  {
    const [rows] = await db.execute(
      'SELECT title, rating FROM books WHERE rating LIKE ?',[ertekeles],
    );
  
    return { books: rows };
  }


  @Post('books/new')
  @Redirect()
  async newBook(@Body() book: BooksDto)  {
    const [result]: any = await db.execute(
      'INSERT INTO books (title, rating) VALUES (?, ?)',
      [book.title, book.rating],
    );
    return {
      url: '/',
    };
  }

}
