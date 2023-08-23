import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    image: { type: String },
    status: { type: String }
})

const bookModel = mongoose.model("bookModel", bookSchema);
export default bookModel;