import Joi from 'joi'

const articleSchema = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.string(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.string().required(),
    keywords: Joi.string().required()
})

export default articleSchema;