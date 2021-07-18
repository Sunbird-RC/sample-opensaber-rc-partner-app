import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {ConfigService} from '../config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfigService]
})


export class AppComponent {
  constructor(public keycloakService: KeycloakService,
    public configService: ConfigService
){
  }
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  title = 'learn-app';
  learningMap : Record<string, Array<string>> ={
    "1":["Learn alphabets", "Practice writing lines", "Chapter 1 A Happy Child", "Chapter 2 Three Little Pigs", "Chapter 5 One Little Kitten"],
    "Class I":["Learn alphabets", "Practice writing lines", "Chapter 1 A Happy Child", "Chapter 2 Three Little Pigs", "Chapter 5 One Little Kitten"],
    "5":["Learn about Human body", "Environment", "Learn about Pollution"],
    "Class V":["Learn about Human body", "Environment", "Learn about Pollution"],
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
      let token = await this.keycloakService.getToken();
      console.log("Token: " + token);
      //this.userProfile = await this.keycloakService.loadUserProfile();
      //console.log(this.userProfile);
      this.updateProfile();
    } else {
      console.log("Not logged in");
      this.login();
    }

    this.resources = this.learningMap[this.cls || "0"];
  }

  async updateProfile() {
    this.configService.getConfig()
      .subscribe(resp => {
        let config = resp;
        console.log("config " + JSON.stringify(config));
//{"educationDetails":[{"_osState":"DRAFT","institute":"Test 2 Institue","osid":"1-c085e0a1-63a0-4113-b44b-9141ddaf0de6","medium":"en","class":"Class I","osOwner":"caa31bb5-eb65-45e7-b4db-96b7485ce6eb","board":"cbse"}]}
        try {
          let cls = resp.educationDetails[0]["class"];
          this.resources = this.learningMap[cls || "0"];
        }catch (e) {

        }
      });
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
