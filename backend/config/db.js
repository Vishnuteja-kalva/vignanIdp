  const mongoose = require("mongoose");

  const connectDB = async () => {
    try {
      console.log("MONGO_URL: mongodb+srv://vishnuteja:13705teja@cluster.au0tm.mongodb.net/food_data");
       await mongoose.connect('mongodb+srv://vishnuteja:13705teja@cluster.au0tm.mongodb.net/food_data').then(()=>console.log("DB Connected"));
      
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  };

  module.exports = connectDB; 
