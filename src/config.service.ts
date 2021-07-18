import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Config {
    current_user_url: string;
    user_url: string;
    code_search_url: any;
}

@Injectable()
export class ConfigService {
  educationDetails: any;
  constructor(private http: HttpClient) { }
  configUrl = 'assets/config.json';

  getConfig() {
    let id = "a1-91eff74d-009f-4600-98d7-e38a04b9681e";
    return this.http.get<ConfigService>("/partner/api/v1/Student/" + id);
  }
}

