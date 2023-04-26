const showFormattedDate = (date, mode) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(mode === 'id' ? 'id-ID' : 'en-EN', options);
};

function FormattedDate(date) {
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export { showFormattedDate, FormattedDate };
