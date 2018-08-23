import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {map} from "rxjs/operators";
import {pipe} from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }
// Para iniciar sesión con cuenta de facebook
  loginFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

// Para iniciar sesión con cuenta de google
  loginGoogle() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }
// Para registrar usuario con correo electronico y contraseña
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
// Para iniciar sesión con correo electrónico
  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }
// Para verificar el estado de la sesión
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
// Para cerrar sesión
  logout() {
    return this.afAuth.auth.signOut();
  }
}
