import express from "express";

const router = express.Router();
const app = express();
 
app.use('/', router); 

// =========================================================================       Users

router.get('/users', Controller); //get all users

router.get('/users/new', Controller); //show form to make ONE new user

router.post('/users', Controller); // add new user to database, then redirect

router.get('/users/:id', Controller); // get ONE user by id

router.get('/users/:id/edit', Controller); // show edit form of ONE user

router.put('/users/:id', Controller); // update ONE user by id, then redirect

router.delete('/users/:id', Controller); // delete ONE user by id, then redirect

// =========================================================================       Images

router.get('/images', Controller); //get all images

router.get('/images/new', Controller); //show form to upload ONE new image

router.post('/images', Controller); // add new image to database, then redirect

router.get('/images/:id', Controller); // get ONE image by id

router.get('/images/:id/edit', Controller); // show edit form of ONE image

router.put('/images/:id', Controller); // update ONE image by id, then redirect

router.delete('/images/:id', Controller); // delete ONE image by id, then redirect