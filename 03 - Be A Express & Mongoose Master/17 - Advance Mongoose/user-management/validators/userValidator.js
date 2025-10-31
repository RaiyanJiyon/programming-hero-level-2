const { z } = require('zod');

const userValidationSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    age: z.number().min(10, 'Age must be at least 10'),
})

module.exports = { userValidationSchema };