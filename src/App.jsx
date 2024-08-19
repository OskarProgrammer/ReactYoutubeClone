import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm/LoginForm'
import MainPage from "./components/MainPage/MainPage"

const initialUsers = [
  {
    name: "Oskar",
    password: "root",
    key: 1,
  },
  {
    name: "Robert",
    password: "root",
    key: 2,
  }
]

const initialFilms = [
  {
    ownerKey: 1,
    ownerName: "Oskar",
    filmKey: 2,
    title: "Pierwszy Film",
    desc: "To jest pierwzsy przykladowy filmik",
    link: "https://www.youtube.com/embed/gAyJOLokqqY?list=RDgAyJOLokqqY",
    likes: [],
    disLikes: []
  },
  {
    ownerKey: 1,
    ownerName: "Oskar",
    filmKey: crypto.randomUUID(),
    title: "Drugi Film",
    desc: "To jest drugi przykladowy filmik",
    link: "https://www.youtube.com/embed/_CXRLUqxyds?list=RDgAyJOLokqqY",
    likes: [],
    disLikes: [],
  }
]

const initialComments = [
  {
    ownerKey: 1,
    ownerName: "Oskar",
    commentKey: crypto.randomUUID(),
    text: "Hej to pierwszy komentarz",
    filmKey: 2,
  }
]


function App() {
  const [isLoginForm, setIsLoginForm] = useState(false)
  
  let [users, setUsers] = useState(initialUsers)
  let [currentUserData, setCurrentUserData] = useState({isLogged: "false"})
  let [films, setFilms] = useState(initialFilms)
  let [comments, setComments] = useState(initialComments)


  const loginToSite = (login, password) => {
      users.map((user)=>{
        if (login == user.name && password == user.password) {

          setIsLoginForm(false)
          
          currentUserData = user 
          currentUserData.isLogged = "true"
          setCurrentUserData(currentUserData)
          return true
        }
      })

  }

  const changeName = (newName, accountKey) => {
    let newUsers = []

    users.map((user)=>{
      if (user.key == accountKey) {
        user.name = newName

      }
      newUsers.push(user)
    })


    users = newUsers
    setUsers(users)

    currentUserData.name = newName
  }

  const changePassword = (newPass, accountKey) => {
    let newUsers = []

    users.map((user)=>{
      if (user.key == accountKey) {
        user.password = newPass

      }
      newUsers.push(user)
    })


    users = newUsers
    setUsers(users)

    currentUserData.password = newPass
  }

  const logOut = () => {
    currentUserData = {isLogged: "false"}
    setCurrentUserData(currentUserData)
  }

  const createComment = (filmKey, userKey, userName, text) => {
    let newComment = {
      commentKey: crypto.randomUUID(),
      filmKey: filmKey,
      ownerKey: userKey,
      ownerName: userName,
      text: text,
    }

    comments = [...comments, newComment]
    setComments(comments)
  }

  const likeVideo = (filmKey, ownerKey) => {
      films.map((film)=>{
        if (film.filmKey == filmKey) {
          let i = 0
          film.likes.map((lajk)=>{
            if (lajk == ownerKey){
               i = 1
            }
          })
          if (i != 0){
            let newLajki = []
            film.likes.map((lajk)=>{
              if (lajk != ownerKey){newLajki.push(lajk)}
            })
            film.likes = newLajki
          }else{
            film.likes.push(ownerKey)
          }
        }
      })
      setFilms(films)
  }

  const uploadFilm = (ownerKey,ownerName,title,desc,link) => {
    let newFilm = {
      ownerKey: ownerKey,
      ownerName: ownerName,
      filmKey: crypto.randomUUID(),
      title: title,
      desc: desc,
      link: link,
      likes: [],
      disLikes: []
    }

    films = [...films, newFilm]
    setFilms(films)
  }

  const removeFilm = (filmKey) => {
    let newFilms = []

    films.map((film)=>{
      if (film.filmKey !== filmKey) {
        newFilms.push(film)
      }
    })

    films = newFilms
    setFilms(films)

    let newComments = []

    comments.map((comment)=>{
      if (comment.filmKey !== filmKey){
        newComments.push(comment)
      }
    })

    comments = newComments
    setComments(comments)

  }



  return (
    <>
      {!isLoginForm ? <MainPage 
          onUpload={uploadFilm} 
          onLiked={likeVideo} 
          onCreateComment={createComment} 
          onLogOut={logOut} 
          onChangePass={changePassword} 
          onChangeName={changeName} 
          onLoginForm={()=>{setIsLoginForm(true)}} 
          onRemoveFilm={removeFilm}
          comments={comments} 
          films={films} 
          currentUserData={currentUserData}/> : ""}

      {isLoginForm ? <LoginForm 
          onBack={()=>{setIsLoginForm(false)}} 
          handleLogin={loginToSite}/> : ""}
    </>
  )
}

export default App
