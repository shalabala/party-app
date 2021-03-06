import { Router } from "@angular/router"
import { Party } from "./model/party.model"
import { PartyState } from "./model/party.state"

export const onLogin=function(router: Router){
    if (router.url.endsWith(loginRoute) || router.url.endsWith(registerRoute)) {
      router.navigateByUrl('/' + searchRoute)
    }
  }
  
  export const onLogout=function (router: Router) {
    if (!(router.url.endsWith(loginRoute) || router.url.endsWith(registerRoute))) {
      router.navigateByUrl('/' + loginRoute)
    }
  }

export const loginRoute:string="login"
export const registerRoute:string="register"
export const searchRoute:string="search"
export const coworkerDetailsRoute:string="details"
export function unlocalizedNameFormatter(prefix: string, familyName: string, givenNames: string) {
    return prefix+" "+familyName+" "+givenNames
}


export const emptyParty:Party=
    {
        aristrocraticTitle:'',
        birthDate:'',
        characteristics:[],
        contactMediums:[{name:'',type:'',contact:''}],
        countryOfBirth:'',
        creditProfiles:[{account:'',name:''}],
        deathDate:null,
        disabilities:[''],
        externalReferences:[''],
        familyName:'',
        formattedName:'',
        fullName:'',
        gender:'',
        generation:'',
        givenName:'',
        href: '',
        id:'',
        identifications:[],
        languageAbilities:[''],
        legalName:'',
        location: '',
        maritalStatus: '',
        middleName: '',
        nationality: '',
        otherNames: [],
        placeOfBirth: '',
        preferredGivenName: '',
        relatedParties: [],
        skills: [''],
        status:PartyState.VALIDATED,
        taxExemptions:[{reason: '', value: 0}],
        title:''
    }
