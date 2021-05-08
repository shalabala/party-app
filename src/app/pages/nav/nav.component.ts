import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarContentService } from 'src/app/services/toolbar.content.service';
import { loginRoute } from 'src/app/shared/constants';
import { ToolbarButtonDescription } from 'src/app/shared/model/toolbar.button.description';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  get categories():ToolbarButtonDescription[]{
    return this.toolbarContent.getButtonDescriptors(this.router.url)
  }
  get title():string{
    return this.toolbarContent.getTitle(this.router.url)
  }
  get displayMenu(): boolean{
    return this.toolbarContent.getIfDisplayMenu(this.router.url)
  }
  get menuName(){
    return "Menu"//TODO
  }
  constructor(private toolbarContent: ToolbarContentService, private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
  }
}
