import { action, makeAutoObservable } from "mobx"
import { create } from 'apisauce'
import { APPID } from "../Api/config"
const api = create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    headers: { Accept: 'application/vnd.github.v3+json' },
})
class Data {
    error=false;
    response=[];
   loading=true

    constructor() {
        makeAutoObservable(this)
        action(this.fatch)
    }
    fatch=async(lat,lon)=>{
      await  api
        .get(`/forecast?lat=${lat}&lon=${lon}&APPID=${APPID}`)
        .then(
           async (response) =>{
            if(response.ok){
                this.response=await response.data.list
                this.loading=false

            }else{
                this.loading=false
                this.error=true
            }
                  
            }
            )
    }
}

export default Data

