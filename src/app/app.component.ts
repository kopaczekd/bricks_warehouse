import { Component } from '@angular/core';
import { SUPPLIES } from './models/database';
import { Supply } from './models/supply'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "Magazyn cegieł";
  footer = "© " + this.title + " by Dominik Kopaczek";

  amountOfBricksToSell: number = 0;
  addingSupply = false;
  sellingBricks = false;
  isSoldError: boolean = false;
  isOrderRealized: boolean = false;
  isValidationErrors: boolean = false;
  countOfAvaibaleBricks: number = 0;
  sumToPay: number = 0;
  countOfPackedBricks: number = 0;

  supplies: Supply[] = SUPPLIES;

  newSupply: Supply = { amount: 0, price: 0}

  changeAddingSupply() {
    this.addingSupply = !this.addingSupply;
    if (this.addingSupply){
      this.sellingBricks = false; 
    }
  }

  changeSellingBricks() {
    this.sellingBricks = !this.sellingBricks;
    if (this.sellingBricks){
      this.addingSupply = false; 
    }
  }

  cleanWarehouse() {
    this.supplies = [];
    this.sellingBricks = false;
  }

  isWarehouseEmpty() {
    if (this.supplies.length === 0){
      return true;
    } else {
      return false;
    };
  }

  addSupply() {

    this.hideOrderRealizedSection();
    this.hideSoldErrorSection();

    if ((this.newSupply.amount <= 0) || (this.newSupply.price <= 0)){
      this.showValidationErrors();
    } else {
      this.supplies.unshift(this.newSupply);
    };

    this.newSupply = { amount: 0, price: 0}
  }

  handleSellBricks(){

    this.handleAllForSell();

    if (this.amountOfBricksToSell <= 0){
      this.showValidationErrors();
    } else {
      if (this.areThereEnoughBricksInWarehouse()){
        let countOfBricksLeftToPack = this.amountOfBricksToSell;

        while (this.stillNeedBricks()) {
          let bricksBatch = this.supplies[this.supplies.length-1];
          
          if (this.isWholeBricksBatchNeeded(bricksBatch.amount, countOfBricksLeftToPack)){
            countOfBricksLeftToPack = this.handleWholeBricksBatch(
              bricksBatch.amount, 
              bricksBatch.price, 
              countOfBricksLeftToPack);
          } else {
            this.handlePartOfBricksBatch(
              bricksBatch.amount, 
              bricksBatch.price, 
              countOfBricksLeftToPack);
          };
        };
  
        this.amountOfBricksToSell = 0;
        this.showOrderRealizedSection();
  
        if (this.isWarehouseEmpty()){
          this.sellingBricks = false; 
        }
      } else {
        this.showSoldErrorSection();
        this.amountOfBricksToSell = this.countOfAvaibaleBricks;
      };
    };
  };

  stillNeedBricks(){
    if (this.countOfPackedBricks < this.amountOfBricksToSell){
      return true;
    } else {
      return false;
    };
  };

  areThereEnoughBricksInWarehouse(){
    if (this.amountOfBricksToSell <= this.countOfAvaibaleBricks){
      return true;
    } else {
      return false;
    };
  };

  isWholeBricksBatchNeeded(bricksBatchAmount: number, countOfBricksLeftToPack: number){
    if (bricksBatchAmount <= countOfBricksLeftToPack){
      return true;
    } else {
      return false;
    };
  };

  handleWholeBricksBatch(bricksBatchAmount: number, bricksBatchPrice: number, countOfBricksLeftToPack: number){
    this.sumToPay += bricksBatchAmount * bricksBatchPrice;
    this.countOfPackedBricks += bricksBatchAmount;
    countOfBricksLeftToPack = this.amountOfBricksToSell - this.countOfPackedBricks;
    this.supplies = this.supplies.slice(0, this.supplies.length);
    this.supplies.pop();
    return countOfBricksLeftToPack;
  };
  
  handlePartOfBricksBatch(bricksBatchAmount: number, bricksBatchPrice: number, countOfBricksLeftToPack: number){
    this.sumToPay += countOfBricksLeftToPack * bricksBatchPrice;
    this.countOfPackedBricks += countOfBricksLeftToPack;
    this.supplies[this.supplies.length-1].amount = bricksBatchAmount - countOfBricksLeftToPack;
  };

  handleAllForSell(){
    this.hideOrderRealizedSection();
    this.hideSoldErrorSection();
    this.resetNeededVariables();
    this.countBricksInWarehouse();
  };

  countBricksInWarehouse(){
    this.supplies.forEach(element => {
      this.countOfAvaibaleBricks += element.amount;
    });
  };
  
  hideOrderRealizedSection(){
    this.isOrderRealized = false;
  };
  
  showOrderRealizedSection(){
    this.isOrderRealized = true;
  };
  
  hideSoldErrorSection(){
    this.isSoldError = false;
  };

  showSoldErrorSection(){
    this.isSoldError = true;
  };

  hideValidationErrors(){
    this.isValidationErrors = false;
  };

  showValidationErrors(){
    this.isValidationErrors = true;
  };

  resetNeededVariables(){
    this.countOfAvaibaleBricks = 0;
    this.sumToPay = 0;
    this.countOfPackedBricks = 0;
  };

  hideAllCommunicats(){
    this.hideOrderRealizedSection();
    this.hideSoldErrorSection();
    this.hideValidationErrors();
  };
}
