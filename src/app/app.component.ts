import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(public keycloakService: KeycloakService
){
  }
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  title = 'learn-app';
  learningMap : Record<string, Array<string>> ={
    "1":["Learn alphabets", "Practice writing lines", "Chapter 1 A Happy Child", "Chapter 2 Three Little Pigs", "Chapter 5 One Little Kitten"],
    "5":["Learn about Human body", "Environment", "Learn about Pollution"],
    "9":["Number Systems", "Triangles", "Circles"],
    "10": ["Polynomials", "Real Numbers", "Quadratic Equations", "Arithmetic Progressions", "Introduction to Trigonometry"],
    "0":["Update your profile", "Explore wikipedia"]
  }


  /*{
    "1":["Learn alphabets", "Practice writing lines", "Chapter 1 A Happy Child", "Chapter 2 Three Little Pigs", "Chapter 5 One Little Kitten"],
    "5":["Learn about Human body", "Environment", "Pollution"],
    "9":["Number Systems", "Triangles", "Circles"],
    "10": ["Polynomials", "Real Numbers", "Quadratic Equations", "Arithmetic Progressions", "Introduction to Trigonometry"],
    "0":["Explore wikipedia", "Update your profile"]
  }; */
  cls:string="";
  resources = ["Update your profile"];
  async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      var token = await this.keycloakService.getToken();
      console.log("Token: " + token);
      //this.userProfile = await this.keycloakService.loadUserProfile();
      //console.log(this.userProfile);
    } else {
      console.log("Not logged in");
      this.login();
    }

    this.resources = this.learningMap[this.cls || "0"];
  }
  public async login() {
    var loginInfo = await this.keycloakService.login({
      scope: 'class'
    });
    this.keycloakService.getToken()
    console.log('Login' + loginInfo);
  }

  public logout() {
    this.keycloakService.logout();
  }
}
