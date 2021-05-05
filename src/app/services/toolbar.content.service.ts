import { Injectable } from '@angular/core';
import { loginRoute, searchRoute, coworkerHierarchyRoute, registerRoute } from '../shared/constants';
import { ToolbarButtonDescription } from '../shared/model/toolbar.button.description';

@Injectable({
  providedIn: 'root'
})
export class ToolbarContentService {

  buttons: ToolbarButtonDescription[]=[
    {
      text: 'Keresés',
      route: searchRoute
    },
    {  text: 'Beosztottak',
      route: coworkerHierarchyRoute
    }
  ]

  constructor() { }

  getButtonDescriptors(route: string):ToolbarButtonDescription[]{
    if(route.endsWith(loginRoute)||route.endsWith(registerRoute)){
      return []
    }else return this.buttons;
  }
  getTitle(route: string): string{
    return "Company personel database"

  }
  getIfDisplayMenu(route: string): boolean{
    return !(route.endsWith(loginRoute)||route.endsWith(registerRoute))

  }
}
