import "./FilmTab.css"

const FilmTab = (props) => {

    return (
        <>
        
            <div className="filmTabss" onClick={()=>{props.onOpenFilm(props.filmInfo)}}>
                <p>{props.filmInfo.title}</p>
                <p>{props.filmInfo.desc}</p>
                <hr />
                <p style={{fontWeight:"bold"}}>{props.filmInfo.ownerName}</p>
                <p>Likes: {props.filmInfo.likes.length}</p>
                <p>Unlikes: {props.filmInfo.disLikes.length}</p>
            </div>
        
        </>
    )
}

export default FilmTab