import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected to: ${conn.connection.host}`);
    console.log(`✅ Using Database: ${conn.connection.name}`);

    // const collections = await mongoose.connection.db.listCollections().toArray();
    // console.log("📂 Collections:");
    // collections.forEach((c) => console.log(" -", c.name));
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

