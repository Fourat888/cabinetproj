import { FaFileMedical , FaHistory , FaCalendarCheck , FaSms , FaMoneyCheck , FaImage } from "react-icons/fa";
import './Fonctionalite.css'
import AboutCard from "../about/AboutCard";

const Fonctionalite = () => {

    return (
        <div className='fonctionalite' >
            <div className='container'>
            <div className="card-container">
                <div className="card">
                    <AboutCard icon={<FaFileMedical className='icon' />} 
                        heading='Dossier Medical' 
                        text='Regroupement de l’ensemble des informations administratives et médicales
                        du patient qui facilite les suivis et permet une navigation aisée entre les dossiers.' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaHistory className='icon' />} 
                        heading='Historique' 
                        text='Un accès rapide à la recherche et à l’historique du patient 
                        toute l’information souhaitée est accessible en quelques clics.' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaCalendarCheck className='icon' />} 
                        heading='Agenda' 
                        text='Une gestion multi-agenda du cabinet.
                        Ce logiciel tient à jour la liste des rendez-vous effectués ou en attente classés 
                        (par jour, par semaine ou par mois)' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaSms className='icon' />} 
                        heading='Rappel des rendez vous' 
                        text='Rappel au patient qu’il a rendez-vous par sms ou e-mail.
                        Envoyer un rappel avec date de rendez-vous.' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaMoneyCheck className='icon' />} 
                        heading='Facturation' 
                        text='Mise à jour du reste du montant de prestation des patients par le retrait du montant
                        payé dans chaque consultation. <br/>
                        Génération automatiquement d’une facture détaillée.' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaImage className='icon' />} 
                        heading='Imagerie' 
                        text='Comparaison avant/après des photos'/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Fonctionalite ;
