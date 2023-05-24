import ReviewsDAO from "../dao/reviewsDAO.js"

// Tạo class ReviewsController

export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            const movieID = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.addReview(
                movieID, userInfo, review, date
            )
            res.json({status: "success"})
        }catch(error){
            res.status(500).json({error: error.message })
        }
    }
   
    static async apiUpdateReview(req, res, next){
        try {
            const reviewId = req.body.review_id
            const review = req.body.review
            const userId = req.body.user_id
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId, userId, review, date
            )
            var { error } = ReviewResponse
            if (error) {
                res.status.json({ error })
            }
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("No review was updated")
            }
            res.json({ status: "success " })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId, userId
            )
            var { error } = ReviewResponse
            if (error) {
                res.status.json({ error })
            }
            res.json({ status: "success " })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}
