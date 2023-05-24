import axios from "axios";

const url = 'http://localhost:80/api/v1/movies'
class MovieDataService {
    // Get All
    getAll( query, by='title', page = 0){
        return axios.get(url + `/?page=${page}&${by}=${query}`)
    }
    // Get By id
    get(id) {
        return axios.get(url + `/id/${id}`)
    }
    // Create Review
    createReview(data){
        return axios.port(url + '/review', data)
    }
    // Update Review
    updateReview(data){
        return axios.put(url + '/review', data)
    }
    // Delete Review
    deleteReview(id, userId){
        return axios.delete(url + '/review', {
            data: {
                review_id: id,
                user_id: userId
            }
        })
    }
    // Get Ratings
    getRatings(){
        return axios.get(url + '/ratings')
    }
}

export default new MovieDataService();