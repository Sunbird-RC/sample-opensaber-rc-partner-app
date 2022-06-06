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
    return this.http.get<ConfigService>("/registry/api/v1/Student");
  }
}

