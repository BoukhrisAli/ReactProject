import Axios from "../Axios/api";
const EDITEUR_API="/editeurs"

    const fetchEditeurs=async()=> {
        return await Axios.get(EDITEUR_API);
        }

         
    export const EditeurService = {
        fetchEditeurs
    }
