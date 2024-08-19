import Film from "../Film/Film"
import "./UserSettings.css"



const UserSettings = (props) => {

    const changeName = () => {
        let answer = prompt("Type name...")
        if (answer != "") {
            props.onChangeName(answer, props.currentUserData.key)
        }
    }

    const changePass = () => {
        let answer = prompt("Type pass...")
        if (answer != ""){
            props.onChangePass(answer, props.currentUserData.key)
        }
    }


    return (
        <>
            
            <div className="userContainer">
                <div>
                    <h3>Your Films</h3>
                    {props.films.map((film)=>{
                        if (film.ownerKey === props.currentUserData.key){
                            return <Film
                                filmInfo={film}
                                onOpenFilm={props.onOpenFilm}
                                onRemoveFilm={props.onRemoveFilm}
                            />
                        }
                    })}

                </div>
                <div>
                    <h3>Your Personal Data</h3>
                    <p>Name: {props.currentUserData.name} <br /> <button onClick={()=>{changeName()}}>Change Name</button></p>
                    <hr />
                    <p>Password: {props.currentUserData.password} <br /> <button onClick={()=>{changePass()}}>Change Password</button></p>
                    <hr />
                    <p>Unique account key: {props.currentUserData.key}</p>
                </div>
                <div>
                    <h3>Your Subscriptions</h3>
                </div>
            </div>
        
        </>
    )
}


export default UserSettings