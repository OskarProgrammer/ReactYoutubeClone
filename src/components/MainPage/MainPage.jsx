import { useState } from "react"
import "./MainPage.css"
import UserSettings from "../UserSettings/UserSettings"
import FilmPage from "../FilmPage/FilmPage"
import FilmTab from "../FilmTab/FilmTab"



const MainPage = (props) => {
    const [isUserAccountDetails, setIsUserAccountDetails] = useState(false)
    const [isFilmPage, setIsFilmPage] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const [keyPhrase, setKeyPhrase] = useState("")
    let [currentFilmInfo, setCurrentFilmInfo] = useState({})

    const [newFilmTitle, setNewFilmTitle] = useState("")
    const [newFilmDesc, setNewFilmDesc] = useState("")
    const [newFilmLink, setNewFilmLink] = useState("")

    const openFilmPage = (filmInfo) => {
        currentFilmInfo = filmInfo
        setCurrentFilmInfo(currentFilmInfo)
        setIsFilmPage(true)
        setIsUserAccountDetails(false)
    }

    const uploadNewFilm = () => {
        if (newFilmDesc != "" && newFilmTitle != "" && newFilmLink != ""){
            props.onUpload(props.currentUserData.key,props.currentUserData.name,newFilmTitle,newFilmDesc,newFilmLink)
            setIsUploading(false)
            setNewFilmDesc("")
            setNewFilmLink("")
            setNewFilmTitle("")
        }
    }

    return (
        <>
            <div className="navBar">
                <button onClick={()=>{setIsUserAccountDetails(false); setIsFilmPage(false)}}>
                    Main
                </button>
                
                <input 
                    type="text" 
                    placeholder="Search for films" 
                    value={keyPhrase} 
                    onChange={(e)=>{setKeyPhrase(e.target.value); setIsFilmPage(false)}}
                />


                {props.currentUserData.isLogged == "true" ?
                 <div>
                    <button onClick={()=>{setIsUploading(!isUploading)}}>
                        {isUploading ? "Cancel Uploading" : "Upload New Film"}
                    </button>
                    <button onClick={isUserAccountDetails ? ()=>{props.onLogOut()} : ()=>{setIsUserAccountDetails(true);setIsFilmPage(false)}}>
                        {isUserAccountDetails ? "Log out" : `${props.currentUserData.name}`}
                    </button>
                </div> 
                    :   <button onClick={()=>{props.onLoginForm()}}>
                            Login
                        </button>
                }

            </div>  


            <div className="mainContainer">

                {isUserAccountDetails && props.currentUserData.isLogged == "true" && !isUploading ? 
                    <UserSettings 
                        onChangePass={props.onChangePass} 
                        onChangeName={props.onChangeName} 
                        onOpenFilm={openFilmPage} 
                        onRemoveFilm={props.onRemoveFilm} 
                        films={props.films} 
                        currentUserData={props.currentUserData}/>
                    : ""}
                    
                {isFilmPage && !isUploading ? 
                    <FilmPage 
                        onLiked={props.onLiked} 
                        onCreateComment={props.onCreateComment} 
                        onOpenFilm={openFilmPage}
                        comments={props.comments} 
                        filmInfo={currentFilmInfo} 
                        films={props.films}
                        currentUserData={props.currentUserData} />
                    : ""}


                {(!isFilmPage && !isUserAccountDetails && !isUploading ) || (props.currentUserData.isLogged == "false" && !isFilmPage) ? 
                    <div className="filmContainer">
                        {props.films.map((film)=>{
                            if(keyPhrase == "") {
                                return <FilmTab 
                                            filmInfo={film}
                                            onOpenFilm={openFilmPage}
                                        />
                            }else if (keyPhrase == film.ownerKey || keyPhrase == film.ownerName || film.title == keyPhrase) {
                                return <FilmTab 
                                            filmInfo={film}
                                            onOpenFilm={openFilmPage}
                                        />
                            }
                        })}
                    </div>
                : ""}


                {isUploading ? 
                    <div className="uploadingDiv"> 
                        <h1>Uploading Form</h1>
                        
                        <p>
                            <input type="text" 
                                    value={newFilmTitle} 
                                    onChange={(e)=>{setNewFilmTitle(e.target.value)}}
                                    placeholder="Title"/>
                        </p>

                        <p>
                            <input type="text" 
                                    value={newFilmDesc} 
                                    onChange={(e)=>{setNewFilmDesc(e.target.value)}} 
                                    placeholder="Description"/>
                        </p>

                        <p>
                            <input type="text" 
                                    value={newFilmLink} 
                                    onChange={(e)=>{setNewFilmLink(e.target.value)}} 
                                    placeholder="Link"/>
                        </p>
                        
                        <button onClick={()=>{uploadNewFilm()}}>
                            Upload
                        </button>

                    </div>
                : ""}


            </div>
        </>
    )
}

export default MainPage