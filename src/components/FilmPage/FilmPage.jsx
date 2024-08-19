
import { useEffect, useState } from "react"
import Comment from "../Comment/Comment"
import "./FilmPage.css"


const FilmPage = (props) => {
    const [newComment, setNewComment] = useState("")
    

    const addNewComment = () => {
        if (newComment != ""){
            props.onCreateComment(props.filmInfo.filmKey,  props.currentUserData.key, props.currentUserData.name,
                newComment
            )
            setNewComment("")
        }
    }




    return (
        <>
            <div className="wholeSite">
                <div className="leftContainer">
                    <h3>{props.filmInfo.title}</h3>
                    <iframe alt={props.filmInfo.link}></iframe>
                    <div className="descSection">
                        <p style={{fontWeight:"bold"}}>{props.filmInfo.ownerName}</p>
                        <p>{props.filmInfo.desc}</p>
                        {props.currentUserData.isLogged == "true" ? 
                        <button className="likeButton" onClick={()=>{props.onLiked(props.filmInfo.filmKey, props.currentUserData.key)}}>Like</button> : `${props.filmInfo.lajki.length}`}
                    </div>
                    <div className="commentsSection">
                        {props.currentUserData.isLogged == "true" ? <div>
                            <input type="text" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} placeholder="Your Comment..."/>
                            <button onClick={addNewComment}>Share Comment</button>
                        </div> : ""}
                        
                        {props.comments.map((comment)=>{
                            if (comment.filmKey == props.filmInfo.filmKey){
                                return <Comment
                                        commentInfo={comment}
                                    />
                            }
                        })}
                    
                    </div>

                </div>
                <div className="rightContainer">Next Films</div>
            </div>
        </>
    )
}


export default FilmPage