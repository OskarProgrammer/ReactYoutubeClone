import "./FilmRecomended.css"


const FilmRecomended = (props) => {



    return (
        <>
            
            <div className="filmTab shine" onClick={()=>{props.onOpenFilm(props.filmInfo)}}>
                    <h2>{props.filmInfo.title}</h2>
                    <h4>{props.filmInfo.ownerName}</h4>
            </div>

        </>
    )
}

export default FilmRecomended