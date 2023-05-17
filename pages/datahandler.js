let myData = null;

function handleData(data) {
  myData = data;
}

function getData() {
  return myData;
}

export { handleData, getData };
