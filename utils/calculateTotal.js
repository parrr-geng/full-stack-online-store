function calculateTotal (object) {
    let totalPrice = 0;
  
    for(let i = 0; i < Object.keys(object).length; i++){
      totalPrice += object[Object.keys(object)[i]]["price"]
    }

    return totalPrice;
};
  
module.exports = calculateTotal;