
import { useEffect, useState } from "react"
import Comment from "../Comment/Comment"
import FilmRecomended from "../FilmRecomended/FilmRecomended"
import "./FilmPage.css"


const FilmPage = (props) => {
    const [newComment, setNewComment] = useState("")
    

    const addNewComment = () => {
        if (newComment != ""){
            props.onCreateComment(props.filmInfo.filmKey,  
                                props.currentUserData.key, 
                                props.currentUserData.name,
                                newComment)
            setNewComment("")
        }
    }


    return (
        <>
            <div className="wholeSite">

                <div className="leftContainer">

                    <h3>{props.filmInfo.title}</h3>

                    <iframe src={props.filmInfo.link} alt="xd" allowFullScreen/>

                    <div className="descSection">

                        <p style={{fontWeight:"bold"}}>
                            {props.filmInfo.ownerName}
                        </p>

                        <p>
                            {props.filmInfo.desc}
                        </p>

                        {props.currentUserData.isLogged == "true" ? 
                            <button className="likeButton" 
                                    onClick={()=>{props.onLiked(props.filmInfo.filmKey, props.currentUserData.key)}}>
                                        Like
                            </button> 
                        : ""}

                        <div>Likes: {props.filmInfo.likes.length}</div>
                        <div>Unlikes: {props.filmInfo.disLikes.length}</div>
                        
                    </div>


                    <div className="commentsSection">

                        {props.currentUserData.isLogged == "true" ? 
                            <div>
                                <input type="text" 
                                        value={newComment} 
                                        onChange={(e)=>{setNewComment(e.target.value)}} 
                                        placeholder="Your Comment..."
                                />

                                <button onClick={addNewComment}>
                                    Share Comment
                                </button>
                            </div> 
                        : ""}
                        
                        {props.comments.map((comment)=>{
                            if (comment.filmKey == props.filmInfo.filmKey){
                                return <Comment
                                        commentInfo={comment}
                                    />
                            }
                        })}
                    
                    </div>

                </div>
                
                <div className="rightContainer">

                    <h3>Next Films</h3>
                    
                    {props.films.map((film)=>{
                        if (film.filmKey != props.filmInfo.filmKey) {
                            return <FilmRecomended
                                        filmInfo = {film}
                                        onOpenFilm={props.onOpenFilm}
                                    />
                        }
                    })}

                </div>
            </div>
        </>
    )
}


export default FilmPage