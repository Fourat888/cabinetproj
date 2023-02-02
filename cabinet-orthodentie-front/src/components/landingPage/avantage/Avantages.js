import { MdSpeed , MdComputer } from "react-icons/md";
import {GrDocumentPerformance } from "react-icons/gr";import './Avantages.css'
import AboutCard from "../about/AboutCard";

const Avantages = () => {

    return (
        <div className='avantages'>
            <div className='container'>
            <div className="card-container">
                <div className="card">
                    <AboutCard icon={<MdSpeed className='icon' />} 
                        heading='Rapidité de traitement' 
                        text="Il est impérativement nécessaire que la durée d'exécution des traitements 
                        s'approche le plus possible du temps réel." />
                    </div>
                    <div className="card">
                        <AboutCard icon={<GrDocumentPerformance className='icon' />} 
                        heading=' Performance ' 
                        text="Un logiciel doit être avant tout performant c'est-à-dire à travers ses fonctionnalités,
                        répond à toutes les exigences des usagers d'une manière optimale" />
                    </div>
                    <div className="card">
                        <AboutCard icon={<MdComputer className='icon' />} 
                        heading='Convivialité' 
                        text="Facile à utiliser.
                        En effet, les interfaces utilisateurs doivent être conviviales c'est-à-dire simples,
                        ergonomiques et adaptées à l'utilisateur." />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Avantages ;