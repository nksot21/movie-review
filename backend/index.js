import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main(){
    dotenv.config()
    // Khởi tạo đối tượng
    const client = new mongodb.MongoClient(process.env.DB_CONNECTION_STRING)
    const port = process.env.PORT || 8000

    try{
        // Kết nối dữ liệu
        await client.connect()

        // Khởi tạo đối tượng của lớp MoviesDAO 
        await MoviesDAO.injectDB(client)
        // Khởi tạo đối tượng của lớp ReviewsDAO
        await ReviewsDAO.injectDB(client)

        //Chạy máy chủ
        app.listen(port, () => {
            console.log('Server is running on port ' + port)
        })

    }catch(e){
        console.error(e)
        process.exit(1)
    }
}

main().catch(console.error)