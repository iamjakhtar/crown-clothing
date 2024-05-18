import { takeLatest, call, all, put } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutAuthUser } from '../../utils/firebase/firebase.util';
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.actions";



//worker sagas
export function* getSnapshotFromUserAuth(userAuth, additionInfo) {
    console.log('From getSnapshotFromUserAuth ', userAuth, additionInfo);
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionInfo);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailed(error));
    }
} 

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* signInWithGoogle() {
  try {
    const {user} = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({payload: { email, password }}) {
    try {
        const user = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUpWithEmail({ payload: { email, password, displayName } }) {
  try {
     const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
     yield put(signUpSuccess(user, { displayName }))
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionInfo }}) {
    yield call(getSnapshotFromUserAuth, user, additionInfo);
}

export function* signOutStart() {
    try {
       yield call(signOutAuthUser);
       yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed());
    }
}



//watcher/listener sagas
export function* checkUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* googleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signIn() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signUp() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutStart);
}


//user saga to be called in root saga
export function* userSagas() {
    yield all([call(checkUserSession), call(googleSignIn), call(signIn), call(signUp), call(onSignUpSuccess), call(signOut)]);
}