import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth/auth.route";
import productRoutes from "./routes/product/product.route";
import categoryRoutes from "./routes/categories/category.route";
import reviewRoutes from "./routes/review/review.route";
import userRoutes from "./routes/user/user.route";
import { errorHandler } from "./middlewares/error.middleware";
import { responseHanlder } from "./middlewares/response.middleware";
import { swaggerSpec } from "./swagger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (không block nếu fail trên serverless)
connectDB().catch((error) => {
  console.error("MongoDB connection error (non-blocking):", error);
  // Không exit process trên serverless để app vẫn chạy được
});

// khai báo chi tiết các loại status
app.use(responseHanlder);

// Swagger - Custom HTML với CDN để hoạt động trên Vercel
app.get("/api-docs.json", (_req, res) => {
  try {
    res.json(swaggerSpec);
  } catch (error) {
    console.error("Error serving swagger spec:", error);
    res.status(500).json({ error: "Failed to load API documentation" });
  }
});

// Custom Swagger UI HTML với CDN
let swaggerHtml: string;
try {
  swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interior Store API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const spec = ${JSON.stringify(swaggerSpec)};
            const ui = SwaggerUIBundle({
                spec: spec,
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>
`;
} catch (error) {
  console.error("Error generating swagger HTML:", error);
  swaggerHtml = "<html><body><h1>Error loading API documentation</h1></body></html>";
}

app.get("/api-docs", (_req, res) => {
  try {
    res.send(swaggerHtml);
  } catch (error) {
    console.error("Error serving swagger UI:", error);
    res.status(500).send("<html><body><h1>Error loading API documentation</h1></body></html>");
  }
});

// auth
app.use("/api/auth", authRoutes);
// user
app.use("/api/user", userRoutes);
// product
app.use("/api/product", productRoutes);
// category
app.use("/api/category", categoryRoutes);
// review
app.use("/api/review", reviewRoutes);
// middleware handle exception
app.use(errorHandler);

// Export app cho Vercel
module.exports = app;

// Chỉ start server khi không chạy trên Vercel (local development)
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  });
}
