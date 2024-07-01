const express=require('express');

const app=express();
const port=4000;
const multer=require('multer');
const cors=require('cors');
const connectDB=require('./connections');
const path=require('path');
const { type } = require('os');
const addProduct=require('./Routes/Addproducts');
const deleteProduct=require('./Routes/Deleteproduct')
const allProducts=require('./Routes/Allproducts')
const registerRoute=require('./Routes/registerUser');
const loginRoute=require('./Routes/loginUser');
const newCollectionRoute=require('./Routes/NewCollection');
const popularRoute=require('./Routes/Popular');
const addtocartRoute=require('./Routes/Addtocart');

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Hello World');
})
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({
    storage:storage
})

app.use('/addproduct',addProduct);
app.use('/deleteproduct',deleteProduct);
app.use('/allproducts',allProducts);
app.use('/images',express.static('upload/images'))
//for registeration
app.use('/register',registerRoute);
app.use('/login',loginRoute);
app.use('/latest',newCollectionRoute);
app.use('/popular',popularRoute);
app.use('/addtocart',addtocartRoute);

app.post('/upload',upload.single('image'),(req,res)=>{
    res.json({
        success:1,
        img_url:`${req.protocol}://${req.hostname}:${port}/images/${req.file.filename}`
    })
})

connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port 4000. `);
})
