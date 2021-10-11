export function formatDate(date) {
    // console.log(date)
    var date = new Date(date);
    var month = ( (date.getMonth() + 1) < 10 ) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    var day = ((date.getDate()) < 10 ) ? `0${date.getDate()}` : date.getDate();
    var year = date.getFullYear().toString().substr(-2);

    let formattedDate = month + "/" + day + "/" + year;
    
    return formattedDate;
  }


  export function formatTime(date) {
    const d = new Date(date)

    let hours = d.getHours()
    const mins = d.getMinutes()
    console.log(hours, ' ', mins)
    let ampm = 'AM';

    if(hours >= 13) {
      hours -= 12;
      ampm = 'PM';
    }

    return hours + ':' + mins + ampm;
  
  }