import Moment from 'moment';

function DateFormat({ date, format }) {
  if (!format) {
    format = 'DD/MM/yyyy';
  }

  return Moment(date).format(format);
}

export default DateFormat;
