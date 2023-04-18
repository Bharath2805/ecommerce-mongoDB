import dotenv from "dotenv";

dotenv.config()

const config = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL : process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce",
    JWT_SECRET : process.env.JWT_SECRET || "your secret",
    JWT_EXPIRY : process.env.JWT_EXPIRY || "1h"

}

export default config