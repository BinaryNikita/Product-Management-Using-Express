import express, { request, response } from 'express';
import pool from '../db/dbConfig.js';

export const manageProduct = (request, response, next) => {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(err);
    } else {
      let sql =
        'SELECT p.p_id, p.p_name AS product_name, p.p_price As price, p.quantity, c.c_name AS category_name FROM products p JOIN  category c ON p.category_id = c.c_id';
      con.query(sql, (err, result) => {
        con.release();
        if (!err) {
          return response.render('manage-product.ejs', { products: result });
        } else {
          console.log(err);
        }
      });
    }
  });
};
export const addProduct = (request, response, next) => {
  pool.getConnection((err, con) => {
    let { productName, productPrice, quantity, category } = request.body;
    let category_id;

    if (err) {
      console.log(err);
    } else {
      con.query(
        'select c_id from category where c_name = ?',
        [category],
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              category_id = result[0].c_id;

              let sql =
                'insert into products (p_name, p_price, quantity, category_id) values (?, ?, ?, ?)';
              con.query(
                sql,
                [productName, productPrice, quantity, category_id],
                (err, result) => {
                  con.release();
                  if (!err) {
                    response.redirect('/product/manage-product');
                  } else {
                    console.log(err);
                  }
                }
              );
            } else {
              con.release();
              console.log('Category not found');
            }
          } else {
            con.release();
            console.log(err);
          }
        }
      );
    }
  });
};

export const deleteProduct = (request, response, next) => {
  let { productId } = request.body;
  console.log('Request received for deleting product with ID:', productId);
  pool.getConnection((err, con) => {
    if (err) {
      response.send('Some error occured in the mysql connection');
    } else {
      const query = 'delete from products where p_id = ?';
      con.query(query, [productId], (err, result) => {
        con.release();
        if (err) {
          response.send('Some error occurred in delete category');
          console.log(err);
        } else {
          return response.redirect('/product/manage-product');
        }
      });
    }
  });
};

export const updateProduct = (request, response, next) => {
  let productId = request.params.productId;
  console.log('Request received for deleting product with ID:', productId);
  pool.getConnection((err, con) => {
    if (err) {
      response.send('Some error occured in the mysql connection');
    } else {
      const sql = `SELECT p.p_id, p.p_name AS product_name, p.p_price AS price, p.quantity, c.c_name AS category_name 
             FROM products p 
             JOIN category c ON p.category_id = c.c_id 
             WHERE p.p_id = ?`;
      con.query(sql, [productId], (err, result) => {
        con.release();
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          return response.render('update-product.ejs', { product: result[0] });
        }
      });
    }
  });
};

export const updateProductAction = (request, response, next) => {
  pool.getConnection((err, con) => {
    let { productId, productName, productPrice, quantity, category } =
      request.body;
    // console.log(request.body);
    let category_id;

// productPrice = parseInt(productPrice);
    if (err) {
      console.log(err);
      response.send('Error connecting to the database');
    } else {
      con.query(
        'SELECT c_id FROM category WHERE c_name = ?',
        [category],
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              category_id = result[0].c_id;
              const sql =
                'UPDATE products SET p_name = ?, p_price = ?, quantity = ?, category_id = ? WHERE p_id = ?';
              con.query(
                sql,
                [productName, productPrice, quantity, category_id, productId],
                (err, result) => {
                  con.release();
                  if (!err) {
                    response.redirect('/product/manage-product');
                  } else {
                    console.log(err);
                    response.send('Error updating the product');
                  }
                }
              );
            } else {
              con.release();
              console.log('Category not found');
              response.send('Category not found');
            }
          } else {
            con.release();
            console.log(err);
            response.send('Error fetching category');
          }
        }
      );
    }
  });
};
