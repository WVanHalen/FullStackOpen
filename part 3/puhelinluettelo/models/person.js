const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

const validateNumber = {
  validator: (number) => {
    return /^\d{2,3}-\d+$/.test(number)
  },
  msg: 'invalid phone number',
}

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3 },
  number: {
    type: String,
    minlength: 8,
    validate: validateNumber,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
