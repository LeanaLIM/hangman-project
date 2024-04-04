'use client';

import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleLangSelection = (locale) => {
    // Stocker la valeur de la locale dans le localStorage avec une expiration de 3600 secondes
    localStorage.setItem('locale', locale);
    setTimeout(() => {
      // Supprimer l'élément du localStorage après 3600 secondes
      localStorage.removeItem('locale');
    }, 3600000);
    // Rediriger vers la page de jeu avec la locale sélectionnée
    router.push('/game');
  };

  return (
    <div>
      <h1>Sélectionnez la langue</h1>
      <button onClick={() => handleLangSelection('fr-FR')}>
        Français
      </button>
      <button onClick={() => handleLangSelection('en-GB')}>
        English
      </button>
    </div>
  );
};

export default Home;