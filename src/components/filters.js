function change_date(str) {
  let year = str.getFullYear();
  let month = str.getMonth() + 1;
  let day = str.getDate();
  let hour = str.getHours();
  let minutes = str.getMinutes();
  if (month + 1 < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return year + '-' + month + '-' + day + '-' + hour + ':' + minutes
}

export {
  change_date
}
