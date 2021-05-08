import { ContactMedium } from "./contact.medium.model";
import { PartyState } from "./party.state";

export interface Party{
    id: String,
    href: String,
    aristrocraticTitle: String,
    birthDate: Date,
    countryOfBirth: String,
    deathDate?: Date,
    familyName: String,
    formattedName: String,//display name
    fullName: String,
    gender: String,
    generation:String,
    givenName: String,
    legalName: String,
    location: String,
    maritalStatus: String,
    middleName?: String,
    nationality: String,
    placeOfBirth: String,
    preferredGivenName: String,
    title: String,//company title
    status:  PartyState,
    languageAbilities: String[],
    creditProfiles: String[],
    disabilities:String[],
    externalReferences: String[],//[0]=image
    otherNames: String[],
    characteristics: String[],
    skills: String[],
    relatedParties: String[],
    contactMediums:ContactMedium[],
    taxExemptions: String[]
    identifications: String[]
}