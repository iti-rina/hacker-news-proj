import { formatDistanceToNow } from 'date-fns';

/**
 * Компонент для отображения относительного времени с момента указанного времени.
 * @param {number} timestamp - Временная метка в секундах, для которой необходимо вывести относительное время.
 * @returns {JSX.Element} Элемент, отображающий относительное время.
 */

const TimeAgo = ({ timestamp }) => {
  const time = new Date(timestamp * 1000);
  let timeAgo = '';
  if (time) {
    const timePeriod = formatDistanceToNow(time, {addSuffix: true});
    timeAgo = `${timePeriod}`;
  }
  
  return (
    <span title={time}>&nbsp; <i>{timeAgo}</i></span>
  );
}

export default TimeAgo;