import express from "express";
import {create} from "../controllers/UsersController";


export const router = express();


// =========================================================================       Users

router.post('/users', (req,res, next) => {
    let body = req.body 
    create(body).then(
        () => {
            res.status(200)
            res.send(body)
            next();
        }
    )
} ); // add new user to database, then redirect

/* router.get('/users', UserController ); //get all users

router.get('/users/new', UserController); //show form to make ONE new user

router.get('/users/:id', UserController); // get ONE user by id

router.get('/users/:id/edit', UserController); // show edit form of ONE user

router.put('/users/:id', UserController); // update ONE user by id, then redirect

router.delete('/users/:id', UserController); // delete ONE user by id, then redirect */

// =========================================================================       Images

/* router.get('/images', ImageController); //get all images

router.get('/images/new', ImageController); //show form to upload ONE new image

router.post('/images', ImageController); // add new image to database, then redirect

router.get('/images/:id', ImageController); // get ONE image by id

router.get('/images/:id/edit', ImageController); // show edit form of ONE image

router.put('/images/:id', ImageController); // update ONE image by id, then redirect

router.delete('/images/:id', ImageController); // delete ONE image by id, then redirect       */