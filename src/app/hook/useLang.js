
'use client';
import { useState } from 'react';

const useLang = () => {
    const [lang, setLang] = useState(''); // Langue par défaut : vide
    const [defaultWord, setDefaultWord] = useState(''); // Mot par défaut en anglais

    const fetchDefaultWord = async () => {
        try {
            const response = await fetch(`http://localhost:3001/`);
            if (response.ok) {
                const data = await response.json();
                setDefaultWord(data.word);
            } else {
                console.error('Erreur lors de la récupération du mot par défaut : ', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du mot par défaut : ', error);
        }
    };

    const changeLang = async (newLang) => {
        // Envoyer une requête GET à l'API pour changer la langue
        try {
            const response = await fetch(`http://localhost:3001/?locale=${newLang}`);
            if (response.ok) {
                // Mettre à jour la langue dans le state local
                setLang(newLang);
            } else {
                console.error('Erreur lors du changement de langue : ', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors du changement de langue : ', error);
        }
    };

    // Appeler la fonction de récupération du mot par défaut au chargement du hook
    fetchDefaultWord();

    return { lang, defaultWord, changeLang };
};

export default useLang;