import Axios from "../Axios/api";
const SPECIALITE_API="/specialites"

    const fetchSpecialites=async()=> {
        return await Axios.get(SPECIALITE_API);
        }

         
    export const SpecialiteService = {
        fetchSpecialites
    }
