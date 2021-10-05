export default ({ app }, inject) => {
  inject('helper', organization => {
    function timeConvert(time) {
      let converted   =   time.split(':');
      return converted[0]+':'+converted[1];
    }
    let today   =   new Date();
    today       =   new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let weekDay =   today.getDay();
    let week;
    if (weekDay === 0) {
      week    =   organization.sunday;
    } else if (weekDay === 1) {
      week    =   organization.monday;
    } else if (weekDay === 2) {
      week    =   organization.tuesday;
    } else if (weekDay === 3) {
      week    =   organization.wednesday;
    } else if (weekDay === 4) {
      week    =   organization.thursday;
    } else if (weekDay === 5) {
      week    =   organization.friday;
    } else if (weekDay === 6) {
      week    =   organization.saturday;
    }
    if (week.start === week.end) {
      return 'круглосуточно';
    }
    return 'c '+timeConvert(week.start)+' до '+timeConvert(week.end);
  })
}
