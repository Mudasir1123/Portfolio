function clock() {
    let secDots = document.getElementById('secDots')
    let minsDots = document.getElementById('minsDots')
    let hrsDots = document.getElementById('hrsDots')

    var date = new Date();
    var hours = date.getHours() % 12
    var amPm = date.getHours() >= 12 ? 'PM' : 'AM'
    hours = hours === 0 ? 12 : hours
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var secondsDots = ''
    for (var i = 1; i < 61; i++) {
        var rotation = i * 6
        if (i === seconds) {
            secondsDots += '<div class ="dot active" style= "transform: rotate ('+rotation + 'deg)" > </div>'
        }
        else {
            secondsDots += '<div class ="dot" style= "transform: rotate (' + rotation + 'deg)" > </div>'
        }
    }

    secDots.innerHTML = secondsDots + '<b>' + amPm + '</b>' + '<h2>' + zero(seconds) + ' <br> <span> Seconds </span> </h2>'
    minsDots.innerHTML = '<h2>' + zero(minutes) + '<br> <span> Minutes </span> </h2>'
    hrsDots.innerHTML = '<h2>' + zero(hours) + '<br> <span> Hours </span> </h2>'
}

function zero(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}
setInterval(clock, 1000)