import { Article } from "../models";
import multer from 'multer'
import path from 'path'
import Joi from 'joi'
import fs from 'fs'
import {APP_URL} from '../config'
import CustomErrorHandler from "../services/customErrorHandler";
import articleSchema from "../validators/articleValidator";


const storage = multer.diskStorage({
    destination: (req,res,cb) => cb(null, 'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
})

const handleMultipartData = multer({storage, limits:{filesize: 1000000 * 5}}).array('images')

const articleController = {
    async store(req,res,next){
        // Multipart form of data
        handleMultipartData(req,res, async (err) => {
            if(err){
                console.log(err)
                return next(CustomErrorHandler.serverError(err.message))
            }

            //console.log(req.file)
            //const filePath = req.file.path
            //const filePath = req.files
            

            // Validation
            const {error} = articleSchema.validate(req.body)

            if(error){
                //Delete the image first
                fs.unlink(`${appRoot}/{filePath}`, (err) => {
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message))
                    }
                })
                return next(error)
            }

            const {author, title, description, content, category, tags, keywords} = req.body;

            let article;
            try{
                article = new Article({
                    author:author,
                    title:title,
                    description:description,
                    content:content,
                    category:category,
                    tags:tags,
                    keywords:keywords
                })
            
                if(req.files){
                    let path = ""
                    req.files.forEach(function(files,index,arr){
                        path = path+`${APP_URL}/`+files.path+","
                    });
                    path = path.substring(0,path.lastIndexOf(","))
                    article.images=path
                }
                article.save()
            }catch(err){
                return next(err)
            }
            res.status(201).json(article)
        })
    },

    async update(req,res,next){
      const {author, title, description, content, category, tags, keywords} = req.body;
      let article;
      try{
        article = await Article.findOneAndUpdate({_id:req.params.id}, {
          author,
          title,
          description,
          content,
          category,
          tags,
          keywords
        })
      }catch(err){
        return next(err)
      }
      res.status(201).json(article)
    },


    async destroy(req,res,next){
      const article = await Article.findOneAndRemove({
        _id: req.params.id
      })

      if(!article){
        return next(new Error('Nothing to delete'))
      }

      res.json(article)
    },


    async index(req,res,next){
        let article;
        try{
            article = await Article.find().sort({createdAt: -1})
        }catch(err){
            return next(CustomErrorHandler.serverError())
        }
        return res.json(article)
    },

    async filter(req,res,next){
        const date = new Date();
      
        let data;
      
        if (req.query.author) {
          data = await Article.find({
            author: req.query.author
          });
        }

        if (req.query.category) {
            data = await Article.find({
              category: req.query.category
            });
          }

        if (req.query.tags) {
            data = await Article.find({
              $or: [
                {
                  tags: {
                    $regex: req.query.tags,
                  },
                },
              ],
            });
          }

          if (req.query.keywords) {
            data = await Article.find({
              $or: [
                {
                  keywords: {
                    $regex: req.query.keywords,
                  },
                },
              ],
            });
          }
      
        if (req.query.from) {
          data = await Article.find({
            $and: [
              {
                author: {
                  $regex: req.query.author,
                },
                publishedAt: { $gte: req.query.from, $lt: date },
              },
            ],
          });
        }
      
        if (req.query.from && req.query.to) {
          data = await Article.find({
            $and: [
              {
                author: {
                  $regex: req.query.author,
                },
                publishedAt: { $gte: req.query.from, $lt: req.query.to },
              },
            ],
          });
        }
      
        res.send(data);
      }

}

export default articleController;
