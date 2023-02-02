import { Component } from '@angular/core';

export interface PassStrength {
  pass:string
  strength: 'empty' | 'lesEight' | 'easy' | 'medium' | 'strong'
  styleSel: {grey:boolean, red:boolean, redGreyGrey:boolean, yellYellGrey:boolean, green:boolean}
}

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})

export class PassComponent {

  public passStrength :PassStrength = {
    pass: '',
    strength:'empty',
    styleSel:{
      grey:true, red:false, redGreyGrey:false, yellYellGrey:false, green:false
    }
  }

  public inptPassFn(v:any):void {
    const value=v.target.value
    this.passStrength.pass=value;
    let incString:number|boolean = +/[a-zA-Z]/g.test(value);
    let incNum:number|boolean = +/\d/g.test(value);
    let incSymbol:number|boolean = +/[^A-Za-z0-9]/g.test(value);
    const styleSelector:any=this.passStrength.styleSel;

    if /*checks if input is empty*/ (value.length<1){
      this.passStrength.strength='empty';
      styleSelector.green=styleSelector.red=styleSelector.redGreyGrey=styleSelector.yellYellGrey=false;
      styleSelector.grey=true;
    } else if /*checks whether input is les than 8ch but not empty*/ (value.length<8){
      this.passStrength.strength='lesEight';
      styleSelector.green=styleSelector.grey=styleSelector.redGreyGrey=styleSelector.yellYellGrey=false;
      styleSelector.red=true;
    } else if /*checks whether input is at least 8ch and has Num, Letter, SpecSymb*/ (incString+incNum+incSymbol==3){
      this.passStrength.strength="strong";
      styleSelector.grey=styleSelector.red=styleSelector.redGreyGrey=styleSelector.yellYellGrey=false;
      styleSelector.green=true
    } else if /*checks whether input is medium*/ (incString+incNum+incSymbol==2){
      this.passStrength.strength="medium";
      styleSelector.grey=styleSelector.red=styleSelector.redGreyGrey=styleSelector.green=false;
      styleSelector.yellYellGrey=true;
    } else if /*checks whether input is easy*/(incString+incNum+incSymbol==1){
      this.passStrength.strength="easy";
      styleSelector.grey=styleSelector.red=styleSelector.yellYellGrey=styleSelector.green=false;
      styleSelector.redGreyGrey=true;
    }
  }
}
