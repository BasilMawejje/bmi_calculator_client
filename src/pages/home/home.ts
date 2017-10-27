import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { PerfomanceDataProvider } from '../../providers/perfomance-data/perfomance-data';
import { Angular2TokenService } from 'angular2-token';
import { ResultsPage } from '../results/results';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public person: PersonProvider, 
    public perfomanceData: PerfomanceDataProvider,
    public modalCtrl: ModalController,
    private _tokenService: Angular2TokenService
  ) {
    this.user = { distance: 1000, age: 20, gender: 'female' };
  }

  calculate(user) {
    this.person.doAssessment(user.distance);
    this.perfomanceData
    .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
    .subscribe(data => console.log(data));
    this.person.age = this.user.age;
    this.person.gender = this.user.gender;

    this.person.doAssessment(this.user.distance);
    console.log(this.person.assessmentMessage);
  }

  showResults(){
    this.modalCtrl.create(ResultsPage).present();
  }
}
