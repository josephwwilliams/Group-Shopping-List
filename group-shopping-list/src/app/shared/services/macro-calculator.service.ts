import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MacroCalculatorService {
  constructor(private http: HttpClient) {}

  getUserMacros(
    age: number,
    gender: string,
    feet: number,
    inches: number,
    weight: number,
    activitylevel: number,
    goal: string
  ) {
    let alteredGoal: string;
    let alteredGender: string;
    if (goal === 'Gain Weight') {
      alteredGoal = 'weightgain';
    } else if (goal === 'Lose Weight') {
      alteredGoal = 'weightlose';
    } else if (goal === 'Maintain') {
      alteredGoal = 'maintain';
    }
    if (gender === 'Male') {
      alteredGender = 'male';
    } else if (gender === 'Female') {
      alteredGender = 'female';
    } else if (gender === 'Non-Binary') {
      alteredGender = 'male';
    } else if (gender === 'I Prefer To Not Say') {
      alteredGender = 'male';
    }
    let cm: number = (feet * 12 + inches) * 2.54;
    let kg: number = weight / 2.205;
    const httpHeaders = new HttpHeaders({
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'a854ea3ee6mshb6e132f17e7389ap1aa85ejsne3b1fbc8f540',
    });
    return this.http.get<any>(
      `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${alteredGender}&height=${cm}&weight=${kg.toFixed(
        2
      )}&activitylevel=${activitylevel}&goal=${alteredGoal}`,
      {
        headers: httpHeaders,
      }
    );
  }
}
