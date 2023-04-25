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
    console.log(results.rows);
  } catch (err) {
    res.status(500).json({ error: 'an unexpected error occurred' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    // condition a check to see if the item is already in cart and if it is update the quantity
    // get this done once you can actually add an item and remove from the cart
    // might need to check here if isbn are comparable than add to quantity
    const { title, author, isbn, rating, image, price, quantity } = req.body;
    if (!title || !author || !isbn || !rating || !image || !price || !quantity) {
      res.status(400).json({ error: 'title, author, isbn, rating, image, and price are required' });
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
    console.log('This is the book being deleted', book);
    if (book) {
      res.status(204).json(book);
    } else {
      res.status(404).json({ error: `Cannot find cart with "cartId"${cartId}` });
    }
  } catch (err) {
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
