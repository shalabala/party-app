import { Injectable } from '@angular/core';
import { loginRoute, searchRoute,  registerRoute, coworkerDetailsRoute } from '../shared/constants';
import { ToolbarButtonDescription } from '../shared/model/toolbar.button.description';

@Injectable({
  providedIn: 'root'
})
export class ToolbarContentService {

  
  constructor() { }

  getButtonDescriptors(route: string):ToolbarButtonDescription[]{
    return []
  }
  getTitle(route: string): ToolbarButtonDescription{
    if(route.endsWith(coworkerDetailsRoute)){
      return { text: "🠔 Vissza", route: searchRoute}
    }
    return { text: "Company personel database", route: searchRoute}

  }
  getIfDisplayMenu(route: string): boolean{
    return !(route.endsWith(loginRoute)||route.endsWith(registerRoute))

  }
}
