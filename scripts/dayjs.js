
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function updatedDate () {
  const today = dayjs().format ('ddd, MMM D,YYYY h:mm:ss A');

 document.querySelector('.current-date-js').textContent = today
}
setInterval(updatedDate, 1000)
updatedDate();