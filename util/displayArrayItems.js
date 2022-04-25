function displayArrayItems(array) {
  let itemsString = ``;
  for (let item of array) {
    if (array.length > 1 && item !== array[array.length - 1]) {
      itemsString += `${item[0].toUpperCase()}` + `${item.slice(1)}, `
    }
    else {
      itemsString += `${item[0].toUpperCase()}` + `${item.slice(1)}`
    }
  }

  return itemsString;
}

export default displayArrayItems;
