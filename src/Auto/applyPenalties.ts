// applyPenalties.ts
import axios from 'axios';

async function applyPenalties() {
    const apiUrl = 'http://192.168.0.12/gbp_backend/api.php?method=applyPenalties';

    try {
        const response = await axios.get(apiUrl);
        console.log('✅ Pénalités appliquées avec succès:', response.data);
    } catch (error: any) {
        console.error('❌ Erreur lors de l’application des pénalités:', error.message);
    }
}

applyPenalties();
