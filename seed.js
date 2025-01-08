const Product = require('./api/v1/models/Product')
const dbConnection = require('./config/db')

const products = [
    {
        "title": "Produto 1",
        "image": "base64_imagem_1",
        "price": 10.0
    },
    {
        "title": "Produto 2",
        "image": "base64_imagem_2",
        "price": 20.0
    },
    {
        "title": "Produto 3",
        "image": "base64_imagem_3",
        "price": 30.0
    },
    {
        "title": "Produto 4",
        "image": "base64_imagem_4",
        "price": 40.0
    },
    {
        "title": "Produto 5",
        "image": "base64_imagem_5",
        "price": 50.0
    },
    {
        "title": "Produto 6",
        "image": "base64_imagem_6",
        "price": 60.0
    },
    {
        "title": "Produto 7",
        "image": "base64_imagem_7",
        "price": 70.0
    },
    {
        "title": "Produto 8",
        "image": "base64_imagem_8",
        "price": 80.0
    },
    {
        "title": "Produto 9",
        "image": "base64_imagem_9",
        "price": 90.0
    },
    {
        "title": "Produto 10",
        "image": "base64_imagem_10",
        "price": 100.0
    }
]

const insertProducts = async () =>{
    try{
        await dbConnection()
        await Product.insertMany(products)
        console.log('Products inserted successfully.')
        process.exit(0)
    }catch(error){
        throw error
    }
}

insertProducts()

