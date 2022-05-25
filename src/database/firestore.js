import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, deleteDoc, doc, getDocs, where, query, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLfgC8P2R75aw_EvuvZDGBfKW33BBxBec",
  authDomain: "cleansheet-2e988.firebaseapp.com",
  projectId: "cleansheet-2e988",
  storageBucket: "cleansheet-2e988.appspot.com",
  messagingSenderId: "742340598425",
  appId: "1:742340598425:web:208bbe63ec23eefa8f7608",
  measurementId: "G-NFF7LJ31W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

/*
getDocCollection('Code')

async function getDocCollection(request) {

  let data = [];

  const dayTraining = await getDocs(collection(firestore, request));

  dayTraining.forEach((item) => {
    data.push({name: item.id, https: item.data().https});
  });
  console.log(data)
  return data;
}*/

// -------------------

async function getCodeData(request) {

  let data = [];
  const dataCode = await getDocs(collection(firestore, request));

  dataCode.forEach((item) => {

    const request = "Code/"+item.id+"/Algo"
    getDocCollection(request, item.id)
    .then((response) => { 
      if(Object.entries(response).length){ 
        data.push({name: item.id, algo: response});
        console.log(data)
      }
    })
  });
  return data;
}

async function getDocCollection(request) {

  let data = [];

  const dataRequest = await getDocs(collection(firestore, request));

  dataRequest.forEach((item) => {

    data.push({name: item.id, https: item.data().https});
  });

  return data;
}

/*
async function getDocCollection(request, DAY, NAME) {

  let data = [];
  data.push({day: DAY, name: NAME})

  const dayTraining = await getDocs(collection(firestore, request));
  dayTraining.forEach((item) => {
    data.push({name: item.name, weight: item.weight, series: item.series, repetition: item.repetition, muscle: item.muscle, time: item.time});
  });
  return data;
}

/*
async function getCollection(request) {

  const querySnapshot = await getDocs(collection(firestore, request));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());

    const newRequest = "Sport/"+doc.id+"/training"
    getDocCollection(newRequest);
  }); 
}

async function getDocCollection(request) {
  const dayTraining = await getDocs(collection(firestore, request));
  dayTraining.forEach((item) => {
    console.log(item.id, " => ", item.data());
  });
}

function Exercice(name, weight, muscle, rest, series, repetition) {
  this.name = name;
  this.weight = weight;
  this.muscle = muscle;
  this.rest = rest;
  this.series = series;
  this.repetition = repetition;
}


async function getExercicesDay() {

}

const exo = new Exercice("Développé Incliné", 90, "pectoraux", 90, 4, 10);

//newExerciceSport("lundi", exo);

async function newExerciceSport(day, exo) {
  
  console.log(day + " " + exo.name)
  
  await setDoc(doc(firestore, "Sport/"+day+"/training", exo.name), {
    name: exo.name,
    weight: exo.weight,
    muscle: exo.muscle,
    rest: exo.rest,
    series: exo.series,
    repetition: exo.repetition
  });
}

//deleteTable("Sport/lundi/training", "Développé Incliné");

async function deleteTable(path, name) {
  await deleteDoc(doc(firestore, path, name));
}*/

export default { getCodeData }