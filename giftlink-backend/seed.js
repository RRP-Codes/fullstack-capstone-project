const connectToDatabase = require('./models/db');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');

    // Read the gifts.json file
    const giftsPath = path.join(__dirname, 'util', 'import-mongo', 'gifts.json');
    const jsonData = JSON.parse(fs.readFileSync(giftsPath, 'utf8'));

    if (!jsonData.docs || !Array.isArray(jsonData.docs)) {
      throw new Error('gifts.json does not contain an array of gifts in `docs` property');
    }

    const giftsData = jsonData.docs;

    // Map images to public folder
    const gifts = giftsData.map(gift => ({
      ...gift,
      image: gift.image ? `/images/${path.basename(gift.image)}` : '', // strip path to match public/images
    }));

    // Insert into DB
    await collection.deleteMany({}); // clear existing data
    const result = await collection.insertMany(gifts);

    console.log(`✅ Inserted ${result.insertedCount} gifts`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
