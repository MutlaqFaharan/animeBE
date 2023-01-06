export const localeStringOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
};

export const birthdayStringOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export const thirteenYearsAgo = new Date(
  new Date().setFullYear(new Date().getFullYear() - 13),
);
