import { Party } from "./model/party.model"
import { PartyState } from "./model/party.state"

export const loginRoute:string="login"
export const registerRoute:string="register"
export const searchRoute:string="search"
export const coworkerHierarchyRoute:string="hierarchy"
export const companyDetailsRoute:string="company"
export const coworkerDetailsRoute:string="coworker"
export const coworkerEditRoute:string="edit"
export const mainPage:string=searchRoute;

export const testParties: Party[]=[
    {
        aristrocraticTitle:"",
        birthDate:new Date("1989.03.01"),
        characteristics:[""],
        contactMediums:[],
        countryOfBirth:"Magyarország",
        creditProfiles:[],
        deathDate:null,
        disabilities:[],
        externalReferences:['test1.jpg'],
        familyName:"Kovács",
        formattedName:"Kovács Sándor",
        fullName:"Kovács Sándor Péter",
        gender:"férfi",
        generation:"boomer",
        givenName:"Kovács Sándor Péter",
        href: "companyId:asdasdasdasd",
        id:"asdasdélasléd",
        identifications:[],
        languageAbilities:['Angol', 'Eszperantó'],
        legalName:"Kovács Sándor Péter",
        location: "Hungary",
        maritalStatus: "Házas",
        middleName: "Péter",
        nationality: "Magyar",
        otherNames: ["Péter"],
        placeOfBirth: "Budapest",
        preferredGivenName: "Sándor",
        relatedParties: [],
        skills: ["Könyvelés", "Gépírás"],
        status:PartyState.VALIDATED,
        taxExemptions:[],
        title:"Könyvelő"
    },
    {
        aristrocraticTitle:"",
        birthDate:new Date("1990.11.01"),
        characteristics:[""],
        contactMediums:[],
        countryOfBirth:"Magyarország",
        creditProfiles:[],
        deathDate:null,
        disabilities:[],
        externalReferences:['test2.jpg'],
        familyName:"Szabó",
        formattedName:"Szabó Győző",
        fullName:"Szabó Győző",
        gender:"férfi",
        generation:"millenial",
        givenName:"Szabó Győző",
        href: "companyId:asdasdasdasd",
        id:"asdasdélasléd2",
        identifications:[],
        languageAbilities:['Német', 'Spanyol'],
        legalName:"Szabó Győző",
        location: "Hungary",
        maritalStatus: "Egyedülálló",
        middleName: null ,
        nationality: "Magyar",
        otherNames: [],
        placeOfBirth: "Szombathely",
        preferredGivenName: "Győző",
        relatedParties: [],
        skills: ["Emberi erőforrások","Csapat szervezés"],
        status:PartyState.VALIDATED,
        taxExemptions:[],
        title:"HR asszisztens"
    }

]
