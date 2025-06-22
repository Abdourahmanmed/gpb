// renewAbonnements.ts
import axios from 'axios';

async function renewAbonnements() {
  const apiUrl = 'http://192.168.0.12/gbp_backend/api.php?method=renewAbonnements';

  try {
    const response = await axios.get(apiUrl);
    console.log('✅ Abonnements renouvelés avec succès:', response.data);
  } catch (error: any) {
    console.error('❌ Erreur lors du renouvellement des abonnements:', error.message);
  }
}

renewAbonnements();
