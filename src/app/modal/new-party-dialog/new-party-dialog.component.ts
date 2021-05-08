import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Party } from 'src/app/shared/model/party.model';
import { PartyState } from 'src/app/shared/model/party.state';
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
      percent: new FormControl(''),
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
  ngOnInit(): void {

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
  }
  addTaxExemptions(p: Party) {
    throw new Error('Method not implemented.');
  }
  addSkills(p: Party) {
    throw new Error('Method not implemented.');
  }
  addLanguages(p: Party) {
    throw new Error('Method not implemented.');
  }
  addNames(p: Party) {
    throw new Error('Method not implemented.');
  }
  addDisabilities(p: Party) {
    throw new Error('Method not implemented.');
  }
  addBankAccounts(p: Party) {
    throw new Error('Method not implemented.');
  }
  addContacts(p: Party) {
    //for(let c of)
  }
  createNewParty(): Party{
    return {
      aristrocraticTitle:this.form.value.name.namePrefix,
      birthDate:new Date( this.form.value.birth.birthDate),
      characteristics:[""],
      contactMediums:[],//TODO
      countryOfBirth:this.form.value.birth.countryOfBirth,
      creditProfiles:[],//TODO
      deathDate:null,
      disabilities:[],//TODo
      externalReferences:[this.form.value.image],
      familyName:this.form.value.name.familyName,
      formattedName:this.form.value.name.preferredName,
      fullName:"",//TODO
      gender:this.form.value.gender,
      generation:"",
      givenName:"",//TODO
      href: this.auth.user.userId,
      id:uuidv4(),
      identifications:[],
      languageAbilities:[],//TODO,
      legalName:"",//TODO
      location:this.form.value.address ,
      maritalStatus: this.form.value.maritalStatus,
      middleName: "",//TODO
      nationality: this.form.value.nationality,
      otherNames: [],//TODO
      placeOfBirth: this.form.value.birth.placeOfBirth,
      preferredGivenName: "",//TODO
      relatedParties: [],
      skills: [],//TODO
      status:PartyState.VALIDATED,
      taxExemptions:[],//TODO
      title:this.form.value.titleAtCompany
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
