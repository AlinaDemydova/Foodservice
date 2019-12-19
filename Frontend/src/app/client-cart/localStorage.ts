import { LocalStorageTemplate } from './localStorageTemplate';

export const LocStorageCart: LocalStorageTemplate = {

  localStorageName: 'mealsInCart',

  checkIsInLS(itemId, localStorageName) {
    if (this.isLSexist(localStorageName)) {
      return this.getArrFromLS(localStorageName).find(mealInArr => mealInArr.id === itemId);
    } else {
      return false;
    }
  },
  getArrFromLS(localStorageName) {
    const productsInCart = JSON.parse(localStorage.getItem(localStorageName));
    return productsInCart;
  },
  isLSexist(localStorageName) {
    return JSON.parse(localStorage.getItem(localStorageName)) ? true : false;
  },
  addItemToLS(item, localStorageName) {
    if (this.isLSexist(localStorageName)) {
      const arrLS = this.getArrFromLS(localStorageName);
      arrLS.push(item);
      localStorage.setItem(localStorageName, JSON.stringify(arrLS));
    } else {
      localStorage.setItem(localStorageName, JSON.stringify([item]));
    }
  },
  removeFromLS(itemId, localStorageName) {
    let products = this.getArrFromLS(localStorageName);
    products = products.filter(x => x.id !== itemId);
    localStorage.setItem(localStorageName, JSON.stringify(products));
  }
}
