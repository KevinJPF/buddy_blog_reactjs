import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  // register user
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      setLoading(false);

      setError(systemErrorMessage);
    }
  };

  // logout user
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // login user
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage = error;
      console.log(systemErrorMessage);

      if (error.message.includes("invalid-credential")) {
        systemErrorMessage =
          "Este usuário está incorreto ou não existe, por favor verifique se digitou corretamente e tente novamente.";
      } else if (error.message.includes("too-many-requests")) {
        systemErrorMessage =
          "Esta conta foi temporariamente desabilitada por excesso de tentativas. Você pode recuperá-la imediatamente trocando sua senha ou tente novamente mais tarde";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      setLoading(false);

      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
