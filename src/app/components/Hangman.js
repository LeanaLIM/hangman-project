const Hangman = ({ attemptsLeft }) => {
    // Définir les parties du corps du pendu en fonction du nombre d'essais restants
    const bodyParts = [
        attemptsLeft < 11, // Base du pendu
        attemptsLeft < 10, // Barre horizontale basse
        attemptsLeft < 9,  // Barre horizontale haute
        attemptsLeft < 8,  // Barre verticale
        attemptsLeft < 7,  // Jambe droite
        attemptsLeft < 6,  // Jambe gauche
        attemptsLeft < 5,  // Corps
        attemptsLeft < 4,  // Bras droit
        attemptsLeft < 3,  // Bras gauche
        attemptsLeft < 2,  // Cou
        attemptsLeft < 1   // Tête
    ];

    return (
        <svg height="300" width="200" className="hangman">
            {/* Base du pendu */}
            {bodyParts[0] && <line x1="20" y1="280" x2="180" y2="280" />}
            {/* Barre horizontale basse */}
            {bodyParts[1] && <line x1="50" y1="280" x2="50" y2="30" />}
            {/* Barre horizontale haute */}
            {bodyParts[2] && <line x1="50" y1="30" x2="150" y2="30" />}
            {/* Barre verticale */}
            {bodyParts[3] && <line x1="150" y1="30" x2="150" y2="60" />}
            {/* Jambe droite */}
            {bodyParts[4] && <line x1="150" y1="170" x2="180" y2="250" />}
            {/* Jambe gauche */}
            {bodyParts[5] && <line x1="150" y1="170" x2="120" y2="250" />}
            {/* Corps */}
            {bodyParts[6] && <line x1="150" y1="100" x2="150" y2="170" />}
            {/* Bras droit */}
            {bodyParts[7] && <line x1="150" y1="120" x2="180" y2="100" />}
            {/* Bras gauche */}
            {bodyParts[8] && <line x1="150" y1="120" x2="120" y2="100" />}
            {/* Cou */}
            {bodyParts[9] && <circle cx="150" cy="80" r="20" />}
            {/* Tête */}
            {bodyParts[10] && <ellipse cx="150" cy="80" rx="20" ry="20" />}
        </svg>
    );
};

export default Hangman;