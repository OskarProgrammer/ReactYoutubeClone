import "./Comment.css"

const Comment = (props) => {
    return (
        <>
        
            <div className="commentDiv">
                {props.commentInfo.ownerName} : {props.commentInfo.text}                
            </div>
        
        </>
    )
}


export default Comment