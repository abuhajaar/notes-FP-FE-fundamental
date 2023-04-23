const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

function FormattedDate(date) {
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export { showFormattedDate, FormattedDate };
