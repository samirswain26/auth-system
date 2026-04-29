// import mongoose from "mongoose";

// export const connectDB = async () => {
//     const url = process.env.MONGO_URL! 
//     console.log("Env URL : ", url)
//   try {
//     await mongoose.connect(process.env.url!);
//     console.log(`My mongo uri is : ${url}`)
//     console.log("DB Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    const url = process.env.MONGO_URL!;
    console.log("Env URL:", url);

    await mongoose.connect(url);

    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};