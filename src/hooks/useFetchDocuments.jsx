import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        console.log('cenellece');
        return;
      }

      console.log('continued');
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        //dashboard

        if (search) {
          // retorna valores filtrados pelas keys
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          // retorna valores filtrados pelo uid do usuario
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          // retorna todos os valores
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);

        setLoading(false);
      }

      console.log('bdtwice');
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
