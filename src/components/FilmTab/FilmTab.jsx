import "./FilmTab.css"

const FilmTab = (props) => {

    return (
        <>
        
            <div className="filmTabss" onClick={()=>{props.onOpenFilm(props.filmInfo)}}>
                <p>{props.filmInfo.title}</p>
                <p>{props.filmInfo.desc}</p>
                <hr />
                <p style={{fontWeight:"bold"}}>{props.filmInfo.ownerName}</p>
                <p>{props.filmInfo.lajki.length}</p>
            </div>
        
        </>
    )
}

export default FilmTab