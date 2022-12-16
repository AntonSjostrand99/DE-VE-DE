// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs , deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1vsfL-gtEVqplLntx9lxyX7PYWy3pOJM",
  authDomain: "de-ve-de-2a8f4.firebaseapp.com",
  projectId: "de-ve-de-2a8f4",
  storageBucket: "de-ve-de-2a8f4.appspot.com",
  messagingSenderId: "372943558257",
  appId: "1:372943558257:web:130550da96175c616e6dd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const inputTitel = document.querySelector(`#titel`);
 const inputGenre = document.querySelector(`#genre`);
 const inputReleaseDate = document.querySelector(`#release-date`);
 const addFilmButton = document.querySelector('#addBtn');
 const filmShower = document.querySelector(`#displaysFilms`);
 const favoShower = document.querySelector(`#showFavoriteBtn`);
 const loadingP =  document.querySelector(`#loadingP`);
 const deletedP = document.querySelector(`#deletedP`)


async function start() {

showAllFilms();


 }


 async function saveToDatabase(filmTitel, filmGenre, filmReleaseDate) {
    try {
        await addDoc(collection(db, "DE-VE-DE"), {
            Titel: filmTitel,
            Genre: filmGenre ,
            ReleaseDate: filmReleaseDate
        });
    } catch (error) {
        console.log('ERROR:', error);
    }
}


async function removeFromDatabase(filmId) {
    try {
      

       await deleteDoc(doc(db, "DE-VE-DE", filmId)); // Radera ett dokument med ett visst id
    //     await addDoc(collection(db, "Watchedfilms") , { // Lägger till den filmen som raderas i en annan collections som heter Watchedfilms

    //         // DeletedFilm: filmText
    // //     Titel: deleteTitel,
    // //     Genre:  deleteGenre ,
    // //     ReleaseDate: deleteReleaseDate
           
    //      });
    } catch (error) {
        console.log('ERROR:', error);
    }

}



function addClickEventFilmList() {
    const filmLists = document.querySelectorAll('li'); // Hämtar alla li-taggar

    
    filmLists.forEach((filmList) => {
        filmList.addEventListener('click', (event) => { // Sätter en eventlistener på varje tagg
            const filmId = event.target.getAttribute(`data-film-id`); 
            console.log(filmId);

            deletedP.style.display = 'block';
            setTimeout(() => {

                location.reload()
              
              }, 1000);
                
            
            removeFromDatabase(filmId);
        });

       
    })
}



async function showAllFilms() {
    const allFilms = await getDocs(collection(db, "DE-VE-DE"));
    console.log(allFilms);

   // favoShower.addEventListener(`click` , () => {

    allFilms.forEach((film) => {
        console.log(film.id);
        console.log(film.data());
        const filmElem = ` <li data-film-id="${film.id}"> ${film.data().Titel} </li>
       `;
       filmShower.insertAdjacentHTML('beforeend', filmElem);
    });


    addClickEventFilmList();

     // })    


        /*    allFilms.forEach((film) => {
            console.log(film.id);
            console.log(film.data());
            const filmElem = ` <li data-film-id="${film.id}"> Titel: ${film.data().Titel} <br> Kategori: ${film.data().Genre} <br> Utgivningsdatum: ${film.data().ReleaseDate} </li>
           `;
           filmShower.insertAdjacentHTML('beforeend', filmElem);
        });
        addClickEventFilmList(); */
    

}


addFilmButton.addEventListener('click', () => {

    const filmTitel = inputTitel.value
    const filmGenre = inputGenre.value
    const filmReleaseDate = inputReleaseDate.value


    if(inputTitel.value === "" || inputGenre.value === "" || inputReleaseDate.value === "") {
        alert("Du måste fylla i");
        loadingP.style.display = 'none';
    }
    else {
        loadingP.style.display = `block`
    }

    
    setTimeout(() => {
       
      
        loadingP.style.display = 'none';
        location.reload()
      
      }, 2000);
     
    saveToDatabase(filmTitel, filmGenre, filmReleaseDate);
   
  
   
});






start();