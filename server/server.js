import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/cart', async (req, res) => {
  try {
    const sql = `
    select *
      from "cart"
    `;
    const results = await db.query(sql);
    res.json(results.rows);
    // console.log(results.rows);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.get('/api/wishlist', async (req, res) => {
  try {
    const sql = `
    select *
      from "wishlist"
    `;
    const results = await db.query(sql);
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.post('/api/wishlist', async (req, res) => {
  try {
    // might have issues with description
    const { title, author, isbn, rating, image, description, price } = req.body;
    if (!title || !author || !isbn || !image || !description || !price) {
      return res.status(400).json({ error: 'title, author, isbn, description, image, and price are required' });
    }
    const sql = `
    insert into "wishlist" ("title", "author", "isbn", "rating", "image", "description", "price")
      values ($1, $2, $3, $4, $5, $6, $7)
      returning *
    `;
    const params = [title, author, isbn, rating, image, description, price];
    const results = await db.query(sql, params);
    const [item] = results.rows;
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { title, author, isbn, rating, image, price, quantity } = req.body;
    if (!title || !author || !isbn || !image || !price || !quantity) {
      return res.status(400).json({ error: 'title, author, isbn, rating, image, and price are required' });
    }
    const sql = `
    insert into "cart" ("title", "author", "isbn", "rating", "image", "price", "quantity")
      values ($1, $2, $3, $4, $5, $6, $7)
      returning *
    `;
    const params = [title, author, isbn, rating, image, price, quantity];
    const results = await db.query(sql, params);
    const [item] = results.rows;
    res.status(201).json(item);
    // console.log('This is the response added', item);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.delete('/api/cart/:cartId', async (req, res) => {
  try {
    const cartId = Number(req.params.cartId);
    if (Number.isNaN(cartId)) {
      return res.status(400).json({ error: `${cartId} was not a number` });
    }
    const sql = `
  Delete
    from "cart"
    where "cartId" = $1
    Returning *
  `;
    const params = [cartId];
    const result = await db.query(sql, params);
    const [book] = result.rows;
    // console.log('This is the book being deleted', book);
    if (book) {
      res.status(204).json(book);
    } else {
      res.status(404).json({ error: `Cannot find cart with "cartId"${cartId}` });
    }
  } catch (err) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }

});

app.delete('/api/wishlist/:wishlistId', async (req, res) => {
  try {
    const wishlistId = Number(req.params.wishlistId);
    if (Number.isNaN(wishlistId)) {
      return res.status(400).json({ error: `${wishlistId} was not a number` });
    }
    const sql = `
  Delete
    from "wishlist"
    where "wishlistId" = $1
    Returning *
    `;
    const params = [wishlistId];
    const result = await db.query(sql, params);
    const [book] = result.rows;
    if (book) {
      res.status(204).json(book);
    } else {
      res.status(404).json({ error: `Cannot find wishlist item with "wishlistId"${wishlistId}` });
    }
  } catch {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

// import 'dotenv/config';
// import express from 'express';
// import errorMiddleware from './lib/error-middleware.js';
// import pg from 'pg';

// // eslint-disable-next-line no-unused-vars -- Remove when used
// const db = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// const app = express();

// // Create paths for static directories
// const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
// const uploadsStaticDir = new URL('public', import.meta.url).pathname;

// app.use(express.static(reactStaticDir));
// // Static directory for file uploads server/public/
// app.use(express.static(uploadsStaticDir));
// app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello World!' });
// });

// app.use(errorMiddleware);

// app.listen(process.env.PORT, () => {
//   process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
// });
