export class LocalStorageTemplate {
  localStorageName: string;

  checkIsInLS(item, localStorageName) {
    const arrInCart = JSON.parse(localStorage.getItem(localStorageName));
    return arrInCart.find(itemInArr => itemInArr.id === item.id) ? true : false;
  };
  getArrFromLS(localStorageName) {
    return JSON.parse(localStorage.getItem(localStorageName));
  };
  isLSexist(localStorageName) {
    return JSON.parse(localStorage.getItem(localStorageName)) ? true : false;
  };
  addItemToLS(item, localStorageName) {
    let arrInLS = this.getArrFromLS(localStorageName);
    arrInLS.setItem(item, JSON.stringify([arrInLS]));
  };
  removeFromLS(item, localStorageName) {
    //
  }
}
