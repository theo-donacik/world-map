export function getDistanceTimer(time: Date): Timer {
  var distance = time.getTime() - new Date().getTime()
  if (distance <= 0){
    distance = 0;
  }

  const days = Math.floor(distance / 86400000);
  const daysRemainder = distance % 86400000

  const hours = Math.floor(daysRemainder / 3600000); 
  const hoursRemainder = daysRemainder % 3600000; 

  const mins = Math.floor(hoursRemainder / 60000); 
  const minsRemainder = hoursRemainder % 60000; 

  const seconds = Math.floor(minsRemainder / 1000); 

  return {days: days, hours: hours, minutes: mins, seconds: seconds}
} 

export function leadingZero(time: number): string {
  return (time < 10 ? "0" + time : time.toString())
}

export type Timer = {
  days: number
  hours: number 
  minutes: number
  seconds: number 
}

export function timerOver(timer: Timer) {
  return timer.days === 0 && timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0
}