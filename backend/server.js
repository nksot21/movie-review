// 20520225
import moviesRoute from './api/movies.route.js'
// Thêm dependency express
import express from 'express'
// Thêm dependency cors
import cors from 'cors'
// Sử dụng các phương thức của express - cors
const app = express();
app.use(cors());
app.use(express.json())

// Định tuyến tới /api/v1/movies
app.use('/api/v1/movies', moviesRoute)
// Xử lý lỗi 404
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
})

export default app;