import { ContactMedium } from "./contact.medium.model";
import { CreditProfile } from "./credit.profile";
import { PartyState } from "./party.state";
import { TaxExemption } from "./tax.exemption";

export interface Party{
    id: string,
    href: string, //company id
    aristrocraticTitle: string,
    birthDate: String,
    countryOfBirth: string,
    deathDate?: String,
    familyName: string,
    formattedName: string,//display name
    fullName: string,
    gender: string,
    generation:string,
    givenName: string,
    legalName: string,
    location: string,
    maritalStatus: string,
    middleName?: string,
    nationality: string,
    placeOfBirth: string,
    preferredGivenName: string,
    title: string,//company title
    status:  PartyState,
    languageAbilities: string[],
    creditProfiles: CreditProfile[],
    disabilities:string[],
    externalReferences: string[],//[0]=image
    otherNames: string[],
    characteristics: string[],
    skills: string[],
    relatedParties: string[],
    contactMediums:ContactMedium[],
    taxExemptions: TaxExemption[]
    identifications: string[]
}