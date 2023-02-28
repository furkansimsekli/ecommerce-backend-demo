const mongoose = require("mongoose");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Review = require("./models/review");
const { hashPassword, generateId } = require("./utils");

require("dotenv/config");


const seedUsers = [
    {
        id: generateId(),
        firstName: "Xavi",
        lastName: "Hernandez",
        passwordHash: hashPassword("maestro6"),
        phone: "+905001239988",
        email: "xavi@barca.com",
        country: "Spain",
        city: "Barcelona",
        zip: "00000",
        street: "Matador St",
        apartment: "Flower-14"
    },

    {
        id: generateId(),
        firstName: "Andres",
        lastName: "Iniesta",
        passwordHash: hashPassword("maestro8"),
        phone: "+905001239977",
        email: "iniesta@barca.com",
        country: "Spain",
        city: "Barcelona",
        zip: "00014",
        street: "Unnamed St",
        apartment: "Beautiful-9"
    },

    {
        id: generateId(),
        firstName: "Sergio",
        lastName: "Busquets",
        passwordHash: hashPassword("pivot5"),
        phone: "+905001239900",
        email: "busquets@barca.com",
        country: "Spain",
        city: "Barcelona",
        zip: "034233",
        street: "New St",
        apartment: "Old"
    }
]

const seedProducts = [
    {
        id: generateId(),
        category: "Computers",
        name: "Huawei Matebook 14",
        image: "https://www.notebookcheck-tr.com/uploads/tx_nbc2/HuaweiMateBook14-2021__1_.jpg",
        price: 799.97
    },

    {
        id: generateId(),
        category: "Computers",
        name: "Macbook Air",
        image: "https://www.notebookcheck-tr.com/uploads/tx_nbc2/air13teaser.jpg",
        price: 999.99
    },

    {
        id: generateId(),
        category: "Electronics",
        name: "Samsung OLED TV",
        image: "https://cdn.akakce.com/z/samsung/samsung-qe55s95batxtk-55-138-8-ekran-4k-uhd-oled-tv.jpg",
        price: 1678.99
    },

    {
        id: generateId(),
        category: "Mobile Phones",
        name: "iPhone 14",
        image: "https://m.media-amazon.com/images/I/611mRs-imxL._AC_UF894,1000_QL80_.jpg",
        price: 1000.00
    },

    {
        id: generateId(),
        category: "Mobile Phones",
        name: "Meizu 20 Pro",
        image: "https://specs-tech.com/wp-content/uploads/2022/05/Meizu-20-Pro.jpg",
        price: 800.76
    }
]

const seedOrders = [
    {
        id: generateId(),
        ownerId: generateId(),
        productIdList: [generateId(), generateId()],
        country: "Turkey",
        city: "Ankara",
        zip: "06800",
        street: "84728. Sokak",
        apartment: "Karanfil Apt."
    },

    {
        id: generateId(),
        ownerId: generateId(),
        productIdList: [generateId(), generateId()],
        country: "Turkey",
        city: "İstanbul",
        zip: "34650",
        street: "404. Sokak",
        apartment: "Duygu Apt."
    }
]

const seedReviews = [
    {
        id: generateId(),
        productId: generateId(),
        author: generateId(),
        context: "I very much liked this product, will buy for my wife too!"
    },

    {
        id: generateId(),
        productId: generateId(),
        author: generateId(),
        context: "Omg, what's wrong with you!! I hated it, colors are awful"
    },
    
    {
        id: generateId(),
        productId: generateId(),
        author: generateId(),
        context: "The shipment was very quick, thanks for the gifts too!"
    },

    {
        id: generateId(),
        productId: generateId(),
        author: generateId(),
        context: "It's the wrong one. I have to refund :("
    }
]

async function seed() {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_URI);

    console.log("Seeding users...");
    await User.insertMany(seedUsers);
    console.log("Seeding products...");
    await Product.insertMany(seedProducts);
    console.log("Seeding orders...");
    await Order.insertMany(seedOrders);
    console.log("Seeding reviews...");
    await Review.insertMany(seedReviews);
    
    console.log("Done!");
    process.exit();
}

seed()
