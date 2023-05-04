module.exports = {
  format_date: (date) => {
    // If the date is undefined or null, return an empty string
    if (!date) {
      return '';
    }
    
    // Convert the date to a localized date string
    return new Date(date).toLocaleDateString();
  },
};

