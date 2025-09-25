import 'dotenv/config';
import express from 'express';
import ClientError from './lib/client-error.js';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import sgMail from '@sendgrid/mail';
import cors from 'cors';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['http://bookpalaceusa.s3-website-us-west-1.amazonaws.com', 'https://bookpalaceusa.com',
    'https://www.bookpalaceusa.com'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

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

app.post('/api/wishlist', async (req, res, next) => {
  try {
    // might have issues with description
    const { title, author, isbn, rating, image, description, price } = req.body;
    if (!title || !author || !isbn || !image || !description || !price) {
      throw new ClientError(400, 'title, author, isbn, description, image, and price are required');
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
    next(err);
  }
});

app.post('/api/cart', async (req, res, next) => {
  try {
    const { title, author, isbn, rating, image, price, quantity } = req.body;
    if (!title || !author || !isbn || !image || !price || !quantity) {
      throw new ClientError(400, 'title, author, isbn, rating, image, and price are required');
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
    next(err);
  }
});

app.delete('/api/cart/:cartId', async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);
    if (Number.isNaN(cartId)) {
      throw new ClientError(400, `${cartId} was not a number`);
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
    if (book) {
      res.status(204).json(book);
    } else {
      throw ClientError(404, `Cannot find cart with "cartId"${cartId}`);
    }
  } catch (err) {
    next(err);
  }

});

app.delete('/api/cart', async (req, res, next) => {
  try {
    const sql = `
  Delete
    from "cart"
 `;
    const result = await db.query(sql);
    if (result) {
      res.status(200).send({ message: 'All items deleted from cart successfully.' });
    }
  } catch (err) {
    next(err);
  }

});

app.delete('/api/wishlist/:wishlistId', async (req, res, next) => {
  try {
    const wishlistId = Number(req.params.wishlistId);
    if (Number.isNaN(wishlistId)) {
      throw new ClientError(400, `${wishlistId} was not a number`);
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
  } catch (err) {
    next(err);
  }
});

// new PUT code starts
app.put('/api/cart/:cartId', async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);
    const newQuantity = req.body.quantity;
    if (Number.isNaN(cartId)) {
      throw new ClientError(400, `${cartId} was not a number`);
    }
    const sql = `
  Update "cart"
  set "quantity" = $1
    where "cartId" = $2
    Returning *
  `;
    const params = [newQuantity, cartId];
    const results = await db.query(sql, params);
    res.status(200).json(results.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to,
      from: 'bookpalace.azurewebsites@gmail.com',
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log('Email sent');
    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  process.stdout.write(`\n\napp listening on port ${PORT}\n\n`);
});
