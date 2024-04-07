'use client';
import { useRouter } from 'next/navigation';


const Card = () => {

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
        <div className='btns-container'>
            <div className='contour'>
                <div className="card" onClick={() => handleLangSelection('fr-FR')}>
                    <img className='flag' src="./img/FR-flag.svg" alt="France flag" />
                    <img className='burger' src='./img/food.png' alt='plat'/>
                    <div className='name-theme'>
                        <h3>Food</h3>
                    </div>
                </div>
            </div>

            <div className="contour">
                <div className='card' onClick={() => handleLangSelection('en-GB')}>
                    <img className='flag' src="./img/UK-flag.svg" alt="France flag" />
                    <img className='statue' src='./img/greek.png' alt='statue'/>
                    <div className='name-theme'>
                        <h3>Mythology</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;