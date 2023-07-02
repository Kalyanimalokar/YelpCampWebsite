const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60f3164adebf963450c0a996',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(descriptors)}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi tenetur unde quidem nihil. Voluptates reiciendis, officia laudantium quasi recusandae nisi vero odit nostrum possimus iste dignissimos repellendus. Modi, obcaecati consequuntur.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/djoukehvd/image/upload/v1629364930/YelpCamp/zesbqxdiuqin1p4yhga2.jpg',
                    filename: 'YelpCamp/zesbqxdiuqin1p4yhga2'
                },
                {
                    url: 'https://res.cloudinary.com/djoukehvd/image/upload/v1629364930/YelpCamp/zzbcftcgllinq4srpsyv.jpg',
                    filename: 'YelpCamp/zzbcftcgllinq4srpsyv'
                },
                {
                    url: 'https://res.cloudinary.com/djoukehvd/image/upload/v1629364930/YelpCamp/zmglvka4b42map4ir2qz.png',
                    filename: 'YelpCamp/zmglvka4b42map4ir2qz'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})