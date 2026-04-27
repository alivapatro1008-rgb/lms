import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from '../server/configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from '../server/controllers/webhooks.js'
import educatorRouter from '../server/routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from '../server/configs/cloudinary.js'
import courseRouter from '../server/routes/courseRoute.js'
import userRouter from '../server/routes/userRoutes.js'

console.log("FORCE DEPLOY");

// Initialize Express
const app = express()

// 🔥 Ensure DB connects only once (important for serverless)
let isConnected = false
const connectOnce = async () => {
  if (!isConnected) {
    await connectDB()
    await connectCloudinary()
    isConnected = true
  }
}

// 🔥 STRIPE WEBHOOK (MUST BE FIRST & RAW)
app.post('/stripe', express.raw({ type: '*/*' }), async (req, res) => {
  await connectOnce()
  return stripeWebhooks(req, res)
})

// Middlewares
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API Working"))

app.post('/clerk', clerkWebhooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)

// ❌ NO app.listen()
// ✅ Export for Vercel
export default app