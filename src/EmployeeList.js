import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { firestoreDb } from "./firebaseconfig";

const EmployeeData = () => {
  const [empData, setEmpData] = useState({});

  const getEmployeeData = () => {
    const docRef = doc(firestoreDb, "employeeData", "1");
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setEmpData(docSnap.data());
      }
    });
  };

  const setEmployeeData = async () => {
    const docRef = doc(firestoreDb, "employeeData", "1");
    try {
      await setDoc(
        docRef,
        {
          token: Math.floor(Math.random() * 100 + 1),
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setEmployeeData();
    getEmployeeData();
  }, []);

  const handleClick = async () => {
    getEmployeeData();
  };

  return (
    <div>
      <button onClick={handleClick}>Get Data</button>
      {Object.entries(empData).length > 0 && (
        <ul>
          <li> Name : {empData.name} </li>
          <li> Role: {empData.role} </li>
          <li> Token: {empData.token} </li>
        </ul>
      )}
    </div>
  );
};

export default EmployeeData;
