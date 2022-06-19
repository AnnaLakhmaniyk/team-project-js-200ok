
import { getDatabase, ref, set, update, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig'
import {MovieService} from './fetchItems';



const app = initializeApp(firebaseConfig);
const db = getDatabase();
let userId=null



function getUserId(id) {
  userId = id;
}

// async function updateFilms(src) {
//   console.log(userId)
//   try {

//     const result = await MovieService.getMoviebyId()

//     update(ref(db, `users/${userId}/${src}`),
//       {b: result});
    
//     }catch (error) {
//     console.error(error.message);
//   }
  
// }

function updateFilms(results, src) {
  update(ref(db, `users/${userId}/${src}`),
   { [results.id]: results}
  );
}

function deletFilm(id, src) {
  update(ref(db, `users/${userId}/${src}`),
   { [id]: null}
  );
}

// const test = document.querySelector('.test')
// test.addEventListener('click',()=> updateFilms('watched'))


function getFilms(src) {
  return get(ref(db, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
    console.log(snapshot.val()[src])
    return snapshot.val()[src]
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}



export {getUserId, updateFilms, getFilms, deletFilm }