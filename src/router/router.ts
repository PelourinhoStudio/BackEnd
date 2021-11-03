import express from "express";

const router = express.Router();
const app = express();
 
router.use('/', router); 

router.use('/users', router); //get all users

router.use('/users/:id', router); // get ONE user by id

router.use('/images', router); // get all images

router.use('/images/:id', router); // get ONE image by id