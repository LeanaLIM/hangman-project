'use client';
import { useEffect, useState } from 'react';

const End = ({ word, allLettersFound, onReload, onQuit }) => {
    const [locale, setLocale] = useState(null);

    useEffect(() => {
        const localeFromLocalStorage = localStorage.getItem('locale');
        if (localeFromLocalStorage) {
            setLocale(localeFromLocalStorage);
        } else {
            const searchParams = new URLSearchParams(window.location.search);
            const localeFromParams = searchParams.get('locale');
            setLocale(localeFromParams || 'fr-FR'); // Utiliser la locale des paramètres si disponible, sinon utiliser 'fr-FR' par défaut
        }
    }, []);

    // Déterminer le message de la modal en fonction de si toutes les lettres ont été trouvées
    const modalMessage = allLettersFound ? (locale === 'fr-FR' ? 'Bien joué !' : 'Well done!') : (locale === 'fr-FR' ? 'Game Over !' : 'Game Over !');

    // Affichage du texte en fonction de la locale
    const foundWordText = locale === 'fr-FR' ? 'Vous avez trouvé le mot :)' : 'You found the word :)';
    const exhaustedAttemptsText = locale === 'fr-FR' ? 'Vous avez épuisé toutes vos tentatives.' : 'You have exhausted all your attempts.';
    const wordText = locale === 'fr-FR' ? 'Le mot était' : 'The word was';
    const reloadButtonText = locale === 'fr-FR' ? 'Relancer' : 'Reload';
    const quitButtonText = locale === 'fr-FR' ? 'Quitter' : 'Quit';

    return (
        <div className="modal-container">

            <div className="modal">
                
                <h2>{modalMessage}</h2>

                {allLettersFound ? (
                    <p>{foundWordText}</p>
                ) : (
                    <p>{exhaustedAttemptsText}</p>
                )}

                <div>
                    <p>{wordText}</p>
                    <h3>{word}</h3>
                </div>

                <div className="button-container">
                    <button onClick={onReload}>{reloadButtonText}</button>
                    <button onClick={onQuit}>{quitButtonText}</button>
                </div>

            </div>
        </div>
    );
};

export default End;