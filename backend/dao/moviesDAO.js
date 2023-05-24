import { ObjectId } from "mongodb";

let movies
//20520225 - Nguyen Do Nha Khuyen
export default class MoviesDAO {
    // phương thức injectDB() tham chiếu tới dữ liệu collection movies
    static async injectDB(conn){
        if(movies){
            return;
        }
        try{
            // tham chiếu tới dữ liệu movies
            movies = await conn.db("sample_mflix").collection('movies')
        }catch(error){
            console.error(`unable to connect in moviesDAO: ${error}`)
        }
    }

    // phương thức getMovies()
    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query
        if(filters){
            if("title" in filters){
                query = {$text: {$search: filters['title']}}
            }else if("rated" in filters){
                query = {"rated": {$eq: filters['rated']}}
            }
        }

        let cursor
        try{
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return {moviesList, totalNumMovies}
        }catch(error){
            console.error(`Unable to issue find command, ${error}`)
            return {moviesList:[], totalNumMovies: 0};
        }
    }

    static async getRatings(){
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        }
        catch(error) {
            console.error(`unable to get ratings, ${error}`)
            return ratings
        }
    }
    static async getMovieById(id){
        try{
            let movie = await movies.aggregate([
                { $match: {_id: new ObjectId(id)}},
                { $lookup: {from: 'reviews', localField: '_id', foreignField: 'movie_id', as: 'reviews'}}
            ]).next()
            return movie
        }catch(error){
            console.error("Cannot get movie by Id")
        }
    }
    
}