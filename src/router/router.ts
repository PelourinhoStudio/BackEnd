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
} ); //get all users

