const d = new Date();
const year = d.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const weekNames = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
var dateToday = setDateToday();
var weeks = 0;
let wholeYearWednesdays = [];
let monthWednesdays = [];
let thisWeekDates = [];
let thisWeekDateOnly = [];
const weekDateLength = $('.week-legend .weekdate').length;
const weekDateDivs = $('.week-legend .weekdate');
const weekDateEventDivs = $('.calendar-body .events');

function setDateToday() {
    return dateToday = d.getFullYear() + '-' + stringMonthDate(d.getMonth() + 1) + '-' + stringMonthDate(d.getDate());
}

function stringMonthDate(number) {
    var string = String(number).padStart(2, '0');
    return string;
}

function formatDate(date) {
    var newDate = new Date(date);
    return newDate.getFullYear() + '-' + stringMonthDate(newDate.getMonth() + 1) + '-' + stringMonthDate(newDate.getDate());
}

function getAllWednesdaysInYear(year) {
    wholeYearWednesdays = [];
    for (let month = 0; month < 12; month++) {
        let date = new Date(year, month, 1);
        while (date.getDay() !== 3) {
            date.setDate(date.getDate() + 1);
        }
        while (date.getMonth() === month) {
            wholeYearWednesdays.push(formatDate(new Date(date)));
            date.setDate(date.getDate() + 7);
        }
    }
}

// get all wednesday in a month
function getAllWednesdaysInMonth (date) {
    monthWednesdays = [];
    let thisMonthDate = new Date(date);

    thisMonthDate.setDate(1)
    var thisMonth = thisMonthDate.getMonth();

    while (thisMonthDate.getDay() !== 3) {
        thisMonthDate.setDate(thisMonthDate.getDate() + 1);
    }
    // Get all the other Wednesday in the month
    while (thisMonthDate.getMonth() === thisMonth) {
        monthWednesdays.push(formatDate(new Date(thisMonthDate.getTime())));
        thisMonthDate.setDate(thisMonthDate.getDate() + 7);
    }
}

// get all dates of current week
function getAllDatesOfCurrWeek (date) {
    thisWeekDates = [];
    thisWeekDateOnly = [];
    let thisWeekDate = new Date(date);
    thisWeekDate.setDate(thisWeekDate.getDate() - thisWeekDate.getDay());
    for (i = 0; i < 7; i++) {
        thisWeekDates.push(formatDate(new Date(thisWeekDate)));
        thisWeekDateOnly.push(formatDate(new Date(thisWeekDate)).split("-")[2]);
        thisWeekDate.setDate(thisWeekDate.getDate() + 1);
    }
    for (let x = 0; x < weekDateLength; x++) {
        weekDateEventDivs[x].innerHTML = thisWeekDates[x];
        weekDateDivs[x].innerHTML = thisWeekDateOnly[x];
        weekDateDivs[x].setAttribute('data-date', thisWeekDates[x]);
    }
}

function renderWeeklyCalendar() {
    const todayDate = new Date();
    getAllWednesdaysInYear(todayDate.getFullYear())
    getAllDatesOfCurrWeek(todayDate);
    getAllWednesdaysInMonth(thisWeekDates[3]);

    let weekYearNum = wholeYearWednesdays.indexOf(thisWeekDates[3]) + 1;
    let weekMonthNum = monthWednesdays.indexOf(thisWeekDates[3]);
    const monthName = monthNames[new Date(thisWeekDates[3]).getMonth()];
    const weekName = weekNames[weekMonthNum];
    $('#weekNum_display').text('Current week number is: ' + weekYearNum);
    $('#month_Display').text(monthName + ' ' + todayDate.getFullYear() + ', ' + weekName );
    $('.week-legend ').find('.weekdate[data-date="' + dateToday + '"]').addClass('text-primary');
}

function getDatesOfPreviousWeek(current) {
    $('.week-legend ').find('.weekdate[data-date="' + dateToday + '"]').removeClass('text-primary');
    let thisPrevDate = new Date(current);
  
    getAllWednesdaysInYear(thisPrevDate.getFullYear())
    getAllDatesOfCurrWeek(thisPrevDate);
    getAllWednesdaysInMonth(thisWeekDates[3]);
  
    let weekYearNum = wholeYearWednesdays.indexOf(thisWeekDates[3]) + 1;
    let weekMonthNum = monthWednesdays.indexOf(thisWeekDates[3]);
    const monthName = monthNames[new Date(thisWeekDates[3]).getMonth()];
    const weekName = weekNames[weekMonthNum];

    $('#weekNum_display').text('Current week number is: ' + weekYearNum);
    $('#month_Display').text(monthName + ' ' + thisPrevDate.getFullYear()  + ', ' +  weekName)
    $('.week-legend ').find('.weekdate[data-date="' + dateToday + '"]').addClass('text-primary');
}

function getDatesOfNextWeek(current) {
    $('.week-legend ').find('.weekdate[data-date="' + dateToday + '"]').removeClass('text-primary');
    let thisNextDate = new Date(current);
  
    getAllWednesdaysInYear(thisNextDate.getFullYear())
    getAllDatesOfCurrWeek(thisNextDate);
    getAllWednesdaysInMonth(thisWeekDates[3]);

    let weekYearNum = wholeYearWednesdays.indexOf(thisWeekDates[3]) + 1;
    let weekMonthNum = monthWednesdays.indexOf(thisWeekDates[3]);
    const monthName = monthNames[new Date(thisWeekDates[3]).getMonth()];
    const weekName = weekNames[weekMonthNum];
    $('#weekNum_display').text('Current week number is: ' + weekYearNum);
    $('#month_Display').text(monthName + ' ' + thisNextDate.getFullYear() + ', ' + weekName)
    $('.week-legend ').find('.weekdate[data-date="' + dateToday + '"]').addClass('text-primary');
}

$('#calendarprevBtn').on('click', '#calendar_prevBtn', function () {
    let newPrevDate = new Date(thisWeekDates[0]);
    newPrevDate.setDate(newPrevDate.getDate() - 7);
    var passDate = new Date(newPrevDate);
    getDatesOfPreviousWeek(passDate);
});

$('#calendarnxtBtn').on('click', '#calendar_nxtBtn', function () {
    let newNextDate = new Date(thisWeekDates[6]);
    newNextDate.setDate(newNextDate.getDate() + 7);
    var passDate = new Date(newNextDate);
    getDatesOfNextWeek(passDate);
});

$(document).ready(function () {
    renderWeeklyCalendar();
})
