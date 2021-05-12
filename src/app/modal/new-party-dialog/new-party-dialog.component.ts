import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { unlocalizedNameFormatter } from 'src/app/shared/constants';
import { ContactMedium } from 'src/app/shared/model/contact.medium.model';
import { CreditProfile } from 'src/app/shared/model/credit.profile';
import { Party } from 'src/app/shared/model/party.model';
import { PartyState } from 'src/app/shared/model/party.state';
import { TaxExemption } from 'src/app/shared/model/tax.exemption';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-party-dialog',
  templateUrl: './new-party-dialog.component.html',
  styleUrls: ['./new-party-dialog.component.scss']
})
export class NewPartyDialogComponent implements OnInit {
  constructor(private auth: AuthService,private dialogRef: MatDialogRef<NewPartyDialogComponent>) { }
  form = new FormGroup({
    name: new FormGroup({
      namePrefix: new FormControl(''),
      familyName: new FormControl('', Validators.required),
      givenNames: new FormControl('', Validators.required),
      preferredName: new FormControl('', Validators.required),
    }),
    image: new FormControl(''),//how this
    titleAtCompany: new FormControl('', Validators.required),
    birth: new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),

    }),
    gender: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    address: new FormControl('',Validators.required),
    maritalStatus: new FormControl(''),
    skills: new FormArray([new FormControl('')]),
    languageAbilities: new FormArray([new FormControl('')]),
    taxExemptions: new FormArray([
      this.newTaxExemption(),
    ]),
    contacts: new FormArray([
      this.newContact(),
    ]),
    disabilities: new FormArray([new FormControl('')]),
    bankAccounts: new FormArray([
      this.newBankAccount()
    ])
  })
  private newBankAccount(){
    return new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, Validators.pattern("\\d*")]),
    })
  }
  private newTaxExemption(){
    return new FormGroup({
      reason: new FormControl(''),
      percent: new FormControl('0',[Validators.pattern("\\d*"),Validators.min(0),Validators.max(100)]),
    })
  }
  private newContact(){
    return new FormGroup({
      type: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required)
    })
  }
  public get skills() {
    return this.form.get('skills') as FormArray
  }
  public get languages() {
    return this.form.get('languageAbilities') as FormArray
  } public get disabilities() {
    return this.form.get('disabilities') as FormArray
  }
  public get contacts() {
    return this.form.get('contacts') as FormArray
  }
  public get bankAccounts() {
    return this.form.get('bankAccounts') as FormArray
  }
  public get taxExemptions() {
    return this.form.get('taxExemptions') as FormArray

  }
  public get nameFormatter(){
    return unlocalizedNameFormatter
    //TODO could be localized
  }
  
  preferredNameEdited=false
  setPeferredName(preferredName, prefix, familyName, givenNames){
    if(!preferredName.touched){
      preferredName.setValue(this.nameFormatter(prefix.value,familyName.value,givenNames.value))
    }
  }
  subscriptions: Subscription[]=[]
  ngOnInit(): void {
    let names=this.form.get("name")
    let prefix=names.get("namePrefix")
    let givenNames=names.get("givenNames")
    let familyName=names.get("familyName")
    let preferredName=names.get("preferredName")

    this.subscriptions.push(
      prefix.valueChanges.subscribe((v)=>this.setPeferredName(preferredName,prefix,familyName,givenNames)),
      givenNames.valueChanges.subscribe((v)=>this.setPeferredName(preferredName,prefix,familyName,givenNames)),
      familyName.valueChanges.subscribe((v)=>this.setPeferredName(preferredName,prefix,familyName,givenNames)),
    )


  }
  ngOnDestroy(){
    for(let s of this.subscriptions){
      s.unsubscribe()
    }

  }

  save() {
    if(!this.form.valid){
      return
    }
    let p=this.createNewParty()
    this.addContacts(p)
    this.addBankAccounts(p)
    this.addDisabilities(p)
    this.addNames(p)
    this.addLanguages(p)
    this.addSkills(p)
    this.addTaxExemptions(p)
    this.dialogRef.close(p)
  }
  addTaxExemptions(p: Party) {
    for( let te of this.taxExemptions.controls){
      let exemption: TaxExemption= {
        reason:te.value.reason,
        value: parseInt(te.value.percent)
      }
      if(exemption.reason!=""){
        p.taxExemptions.push(exemption)
      }
    }
  }
  addSkills(p: Party) {
    for( let skillControl of this.skills.controls){
      let skill=skillControl.value
      if(skill!=""){
        p.skills.push(skill)
      }
    }
  }
  addLanguages(p: Party) {
    for( let languageControl of this.languages.controls){
      let language=languageControl.value
      if(language!=""){
        p.languageAbilities.push(language)
      }
    }
  }
  addNames(p: Party) {
    let names=this.form.value.name
    p.fullName=this.nameFormatter(names.namePrefix,names.familyName,names.givenNames)
    p.legalName=p.fullName

  }
  addDisabilities(p: Party) {
    for( let disabilityControl of this.disabilities.controls){
      let disablitiy=disabilityControl.value
      if(disablitiy!=""){
        p.disabilities.push(disablitiy)
      }
    }
  }
  addBankAccounts(p: Party) {
    for( let accountControl of this.bankAccounts.controls){
      let account: CreditProfile= {
        name:accountControl.value.name,
        account:accountControl.value.number
      }
      if(account.name!=""||account.account!=""){
        p.creditProfiles.push(account)
      }
    }
  }
  addContacts(p: Party) {
    for( let contactControl of this.contacts.controls){
      let contact: ContactMedium= {
        name:"",//TODO?
        type:contactControl.value.type,
        contact:contactControl.value.contact,
      }
      if(contact.type!=""||contact.contact!=""){
        p.contactMediums.push(contact)
      }
    }
  }
  createNewParty(): Party{
    let values=this.form.value
    return {
      aristrocraticTitle:values.name.namePrefix,
      birthDate:new Date( values.birth.date),
      characteristics:[""],
      contactMediums:[],
      countryOfBirth:values.birth.country,
      creditProfiles:[],
      deathDate:null,
      disabilities:[],
      externalReferences:[values.image],
      familyName:values.name.familyName,
      formattedName:values.name.preferredName,
      fullName:"",
      gender:values.gender,
      generation:"",
      givenName:values.name.givenNames,
      href: this.auth.user.userId,
      id:uuidv4(),
      identifications:[],
      languageAbilities:[],
      legalName:"",
      location:values.address ,
      maritalStatus: values.maritalStatus,
      middleName: "",
      nationality: values.nationality,
      otherNames: [],
      placeOfBirth: values.birth.city,
      preferredGivenName: "",
      relatedParties: [],
      skills: [],
      status:PartyState.VALIDATED,
      taxExemptions:[],
      title:values.titleAtCompany
  }
  }
  cancel() {
    this.dialogRef.close(null)
  }
  remove(fa: FormArray, i: number) {
    if(fa.length>1){
      fa.removeAt(i)
    }
  }
  add(fa: FormArray){
    if(fa==this.taxExemptions){
      fa.push(this.newTaxExemption())
    }else if(fa==this.contacts){
      fa.push(this.newContact())
    }else if(fa==this.bankAccounts){
      fa.push(this.newBankAccount())
    }else{
      fa.push(new FormControl(''))
    }

  }


}
