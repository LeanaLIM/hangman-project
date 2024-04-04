'use client';
import { useEffect, useState } from 'react';
import Letter from '../components/Letter';
import End from '../components/End';
import Hangman from '../components/Hangman';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import '../globals.css';


const Game = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameMode />
    </Suspense>
  )
};

const GameMode = () => {
  const router = useRouter();
  const [randomWord, setRandomWord] = useState(null);
  const [foundLetters, setFoundLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(11); // Nombre d'essais restants
  const [allLettersFound, setAllLettersFound] = useState(false);
  const letter = 'abcdefghijklmnopqrstuvwxyz-'.split('');
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const [locale, setLocale] = useState(null);

  /*===========APPEL A L'API========= */

  useEffect(() => {
    // Vérifier si le code s'exécute côté client
    if (typeof window !== 'undefined') {
      const localeFromLocalStorage = localStorage.getItem('locale');
      if (localeFromLocalStorage) {
        setLocale(localeFromLocalStorage);
      } else {
        const localeFromParams = searchParams.get('locale');
        setLocale(localeFromParams || 'fr-FR'); // Utiliser la locale des paramètres si disponible, sinon utiliser 'fr-FR' par défaut
      }
    }
  }, []);

  useEffect(() => {
    // Vérifier si le code s'exécute côté client
    if (typeof window !== 'undefined') {
      const localeFromParams = searchParams.get('locale');
      const localeToUse = localeFromParams || locale; // Utiliser la locale des paramètres si disponible, sinon utiliser celle du localStorage
      if (localeToUse) {
        fetchData(localeToUse);
      }
    }
  }, [locale]);

  const fetchData = async (locale) => {
    try {
      const body = new URLSearchParams({ 'locale': locale }); // Créer les données du corps de la requête

      const response = await fetch('https://node-hangman-api-production.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body // Utiliser les données du corps de la requête
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const word = data.word;
      console.log(word);
      setRandomWord(word);
      setFoundLetters([]);
      setRemainingAttempts(11);

    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  /* =================CLAVIER ET LETTRE================= */

  const handleLetter = (selectedLetter) => {
    // Vérifie si la lettre sélectionnée est présente dans le mot
    if (randomWord.includes(selectedLetter)) {
      // Met à jour les lettres trouvées
      const updatedLetters = [...foundLetters, selectedLetter];
      setFoundLetters(updatedLetters);
      // Vérifier si toutes les lettres du mot ont été trouvées
      if (updatedLetters.length === new Set(randomWord).size) {
        setAllLettersFound(true);
        setShowModal(true);
      }
    } else {
      // Réduit le nombre d'essais restants si la lettre n'est pas trouvée
      setRemainingAttempts(prevAttempts => prevAttempts - 1);
      if (remainingAttempts === 1) {
        // Afficher la modal lorsque le nombre d'essais restants atteint zéro
        setShowModal(true);
      }
    }
  };

  // Affichage du texte en fonction de la locale
  const guessWordText = locale === 'fr-FR' ? 'Devinez le mot' : 'Guess the word';
  const attemptsText = locale === 'fr-FR' ? 'Tentatives restantes' : 'Remaining attempts';
  const quitButtonText = locale === 'fr-FR' ? 'Retour à l\'accueil' : 'Back to Home';

  /* =================MODAL================= */

  const handleReload = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleQuit = () => {
    router.push('/');
  };


  return (
    <>
      <div>
        <h1>H?NGM?N</h1>
        <div className='dash'></div>
        <h2>{guessWordText}</h2>
        <button onClick={handleQuit}>{quitButtonText}</button>
        <h3>{attemptsText}: {remainingAttempts}</h3>
        <Hangman attemptsLeft={remainingAttempts} />
        {randomWord &&
          <h3>
            {randomWord.split('').map((char, index) => (
              <span key={index}>
                {foundLetters.includes(char) ? char : '_ '}
              </span>
            ))}
          </h3>
        }
      </div>
      <div className="letter__container">
        {letter.map((letter, index) => (
          <Letter
            key={index}
            onClick={() => handleLetter(letter)}
            disabled={foundLetters.includes(letter) || remainingAttempts === 0}
          >
            {letter}
          </Letter>
        ))}
      </div>
      {/* Afficher la modal si showModal est vrai */}
      {showModal && <End word={randomWord} allLettersFound={allLettersFound} onReload={handleReload} onQuit={handleQuit} />}
    </>
  );
};


export default Game;