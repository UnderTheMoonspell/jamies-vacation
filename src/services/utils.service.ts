import moment from 'moment';

export const isMobile = (userAgent: any) => {
  return /mobile/i.test(userAgent);
};

export const makeStringUrlSafe = (string: string) => {
  return string
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
};

export const getObjectDiff = (o1: any, o2: any) => {
  return Object.keys(o1).reduce((diff, key) => {
    return JSON.stringify(o1[key]) === JSON.stringify(o2[key])
      ? diff
      : { ...diff, [key]: o2[key] };
  }, {});
};

export const getPlainStringFromRichHtml = (html: string) => {
  return html
    .replace(/(<([^>]+)>)/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/( )\1+/gi, ' ')
    .trim();
};

export const generateId = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);

export const formattedDate = (date = new Date(Date.now())) =>
  moment(date).format('yyyy-MM-DD HH:mm');

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
};

export const sanitize = (html: string) => {
  return html.replace(/<script>|<\/script>/gi, '');
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);