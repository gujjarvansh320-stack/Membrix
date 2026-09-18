import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Gym SaaS API is running',
  })
})

export default app