import MoviesDAO from "../dao/moviesDAO.js"

// Tạo class MoviesController
export default class MoviesController{

    // Tạo function apiGetMovies()
    static async apiGetMovies(req, res, next){
        // Tiếp nhận yêu cầu từ máy khách thông qua api
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.queryPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if(req.query.rated){
            filters.rated = req.query.rated
        }
        else if(req.query.title){
            filters.title = req.query.title
        }

        // Gọi tới hàm getMovies() đã định nghĩa trong daoMovie
        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({
            filters, page, moviesPerPage
        })

        // Trả về chuỗi json để gửi về cho máy khác
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }

        res.json(response)
    }

    static async apiGetMovieById(req, res, next){
        // 20520225
        try{
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id)
            if(!movie){
                res.status(404).json({error: "movie not found"})
                return
            }
            res.json(movie)
        }catch(error){
            console.log(`api: ${error}`)
            res.status(500).json({error: error})
        }
    }

    static async apiGetRatings(req, res, next){
        //20520225
        try{
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        }catch(error){
            console.log(`api: ${error}`)
            res.status(500).json({error: error})
        }
    }
}
