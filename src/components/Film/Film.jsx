import "./Film.css"

const Film = (props) => {

    return (
        <>
        
            <div className="filmTab">
                <div onClick={()=>{props.onOpenFilm(props.filmInfo)}}>
                    <p>{props.filmInfo.title}</p>
                    <p>{props.filmInfo.filmKey}</p>
                </div>

                <button onClick={()=>{props.onRemoveFilm(props.filmInfo.filmKey)}}>Remove Film</button>
            </div>
        
        </>
    )
}

export default Film 