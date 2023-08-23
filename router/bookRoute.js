import express from 'express';
import bookModel from '../Model/bookModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const search = req.query.name || "";
    const status = req.query.status || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const query = {
        name: { $regex: search, $options: "i" },
        status: status === "Available" ? "Available" : { $regex: status, $options: "i" },
    };
    try {
        const count = await bookModel.countDocuments(query); // get the total number of documents that match the query

        const book = await bookModel.find(query).skip((page - 1) * limit).limit(limit);
        res.send({ book, count });
    } catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id)
        res.send(book)
    } catch (error) {
        res.send({ message: error })
    }
})

router.post('/', async (req, res) => {
    try {
        console.log("first", req.body)
        const book=await bookModel.create(req.body)
        res.send({book})
    } catch (error) {
        res.send({ message: error + "Spmething went wrong" })

    }
})

router.delete('/:id', async (req, res) => {
    try {
        const book = await bookModel.findByIdAndDelete(req.params.id)
        res.send(book)
    } catch (error) {
        res.send(error)
    }
})


router.patch("/:id", async (req, res) => {
    try {
            console.log("update",req.body)
                const book = await bookModel.findByIdAndUpdate(req.params.id, req.body)
                res.send(book)
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router