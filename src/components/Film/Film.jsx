import "./Film.css"

const Film = (props) => {

    return (
        <>
        
            <div className="filmTab" onClick={()=>{props.onOpenFilm(props.filmInfo)}}>
                <p>{props.filmInfo.title}</p>
                <p>{props.filmInfo.filmKey}</p>
            </div>
        
        </>
    )
}

export default Film