import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { emptyParty, unlocalizedNameFormatter } from 'src/app/shared/constants';
import { ContactMedium } from 'src/app/shared/model/contact.medium.model';
import { CreditProfile } from 'src/app/shared/model/credit.profile';
import { Party } from 'src/app/shared/model/party.model';
import { PartyState } from 'src/app/shared/model/party.state';
import { TaxExemption } from 'src/app/shared/model/tax.exemption';
import { v4 as uuidv4 } from 'uuid';

export interface DialogData {
  party:Party
}

@Component({
  selector: 'app-new-party-dialog',
  templateUrl: './new-party-dialog.component.html',
  styleUrls: ['./new-party-dialog.component.scss']
})
export class NewPartyDialogComponent implements OnInit {
  party?: Party = null

  form: FormGroup
  preferredNameEdited = false
  subscriptions: Subscription[] = []
  

  constructor(private auth: AuthService, private dialogRef: MatDialogRef<NewPartyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      if(data&&data.party){
        this.party=data.party
      }
    }

  ngOnInit(): void {

    if (this.party == null) {
      this.form=this.createForm(emptyParty)
      let names = this.form.get("name")
      let prefix = names.get("namePrefix")
      let givenNames = names.get("givenNames")
      let familyName = names.get("familyName")
      let preferredName = names.get("preferredName")

      this.subscriptions.push(
        prefix.valueChanges.subscribe((v) => this.setPeferredName(preferredName, prefix, familyName, givenNames)),
        givenNames.valueChanges.subscribe((v) => this.setPeferredName(preferredName, prefix, familyName, givenNames)),
        familyName.valueChanges.subscribe((v) => this.setPeferredName(preferredName, prefix, familyName, givenNames)),
      )
    }else{
      this.form=this.createForm(this.party)
    }
  }

  ngOnDestroy() {
    for (let s of this.subscriptions) {
      s.unsubscribe()
    }
  }

  createForm(p: Party){
    return new FormGroup({
      name: new FormGroup({
        namePrefix: new FormControl(p.aristrocraticTitle),
        familyName: new FormControl(p.familyName, Validators.required),
        givenNames: new FormControl(p.givenName, Validators.required),
        preferredName: new FormControl(p.formattedName, Validators.required),
      }),
      image: new FormControl(p.externalReferences[0]),//how this
      titleAtCompany: new FormControl(p.title, Validators.required),
      birth: new FormGroup({
        country: new FormControl(p.countryOfBirth, Validators.required),
        city: new FormControl(p.placeOfBirth, Validators.required),
        date: new FormControl(p.birthDate, Validators.required),
      }),
      gender: new FormControl(p.gender, Validators.required),
      nationality: new FormControl(p.nationality, Validators.required),
      address: new FormControl(p.location, Validators.required),
      maritalStatus: new FormControl(p.maritalStatus),
      skills: new FormArray(p.skills.map(s=>new FormControl(s))),
      languageAbilities: new FormArray(p.languageAbilities.map(s=>new FormControl(s))),
      taxExemptions: new FormArray(p.taxExemptions.map(s=>this.newTaxExemption(s))),
      contacts: new FormArray(p.contactMediums.map(m=>this.newContact(m))),
      disabilities: new FormArray(p.disabilities.map(d=>new FormControl(d))),
      bankAccounts: new FormArray(p.creditProfiles.map(p=>this.newBankAccount(p)))
    })
  }
  private newBankAccount(b: CreditProfile ) {
    return new FormGroup({
      name: new FormControl(b.name, Validators.required),
      number: new FormControl(b.account, [Validators.required, Validators.pattern("\\d*")]),
    })
  }
  private newTaxExemption(e: TaxExemption) {
    return new FormGroup({
      reason: new FormControl(e.reason),
      percent: new FormControl(e.value, [Validators.pattern("\\d*"), Validators.min(0), Validators.max(100)]),
    })
  }
  private newContact(c: ContactMedium) {
    return new FormGroup({
      type: new FormControl(c.type, Validators.required),
      contact: new FormControl(c.contact, Validators.required)
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
  public get nameFormatter() {
    return unlocalizedNameFormatter
    //TODO could be localized
  }
  
  setPeferredName(preferredName, prefix, familyName, givenNames) {
    if (!preferredName.touched) {
      preferredName.setValue(this.nameFormatter(prefix.value, familyName.value, givenNames.value))
    }
  }

  save() {
    if (!this.form.valid) {
      return
    }
    let p = this.createNewParty()
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
    for (let te of this.taxExemptions.controls) {
      let exemption: TaxExemption = {
        reason: te.value.reason,
        value: parseInt(te.value.percent)
      }
      if (exemption.reason != "") {
        p.taxExemptions.push(exemption)
      }
    }
  }
  addSkills(p: Party) {
    for (let skillControl of this.skills.controls) {
      let skill = skillControl.value
      if (skill != "") {
        p.skills.push(skill)
      }
    }
  }
  addLanguages(p: Party) {
    for (let languageControl of this.languages.controls) {
      let language = languageControl.value
      if (language != "") {
        p.languageAbilities.push(language)
      }
    }
  }
  addNames(p: Party) {
    let names = this.form.value.name
    p.fullName = this.nameFormatter(names.namePrefix, names.familyName, names.givenNames)
    p.legalName = p.fullName

  }
  addDisabilities(p: Party) {
    for (let disabilityControl of this.disabilities.controls) {
      let disablitiy = disabilityControl.value
      if (disablitiy != "") {
        p.disabilities.push(disablitiy)
      }
    }
  }
  addBankAccounts(p: Party) {
    for (let accountControl of this.bankAccounts.controls) {
      let account: CreditProfile = {
        name: accountControl.value.name,
        account: accountControl.value.number
      }
      if (account.name != "" || account.account != "") {
        p.creditProfiles.push(account)
      }
    }
  }
  addContacts(p: Party) {
    for (let contactControl of this.contacts.controls) {
      let contact: ContactMedium = {
        name: "",//TODO?
        type: contactControl.value.type,
        contact: contactControl.value.contact,
      }
      if (contact.type != "" || contact.contact != "") {
        p.contactMediums.push(contact)
      }
    }
  }
  createNewParty(): Party {
    let values = this.form.value
    return {
      aristrocraticTitle: values.name.namePrefix,
      birthDate: values.birth.date,
      characteristics: [""],
      contactMediums: [],
      countryOfBirth: values.birth.country,
      creditProfiles: [],
      deathDate: null,
      disabilities: [],
      externalReferences: [values.image],
      familyName: values.name.familyName,
      formattedName: values.name.preferredName,
      fullName: "",
      gender: values.gender,
      generation: "",
      givenName: values.name.givenNames,
      href: this.party?this.party.href:this.auth.user.userId, //fontos
      id: this.party?this.party.id:uuidv4(),//fontos
      identifications: [],
      languageAbilities: [],
      legalName: "",
      location: values.address,
      maritalStatus: values.maritalStatus,
      middleName: "",
      nationality: values.nationality,
      otherNames: [],
      placeOfBirth: values.birth.city,
      preferredGivenName: "",
      relatedParties: [],
      skills: [],
      status: PartyState.VALIDATED,
      taxExemptions: [],
      title: values.titleAtCompany
    }
  }
  cancel() {
    this.dialogRef.close(null)
  }
  remove(fa: FormArray, i: number) {
    if (fa.length > 1) {
      fa.removeAt(i)
    }
  }
  add(fa: FormArray) {
    if (fa == this.taxExemptions) {
      fa.push(this.newTaxExemption({reason:'',value:0}))
    } else if (fa == this.contacts) {
      fa.push(this.newContact({name:'',contact:'',type:''}))
    } else if (fa == this.bankAccounts) {
      fa.push(this.newBankAccount({name:'',account:''}))
    } else {
      fa.push(new FormControl(''))
    }

  }

}
