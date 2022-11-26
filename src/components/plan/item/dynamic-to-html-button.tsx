import { Delta } from 'quill';

const getHtml = (inputDelta: Delta) => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  // eslint-disable-next-line
  const rte = require('@mantine/rte');

  const tempCont = document.createElement('div');
  new rte.Quill(tempCont).setContents(inputDelta);
  const html = tempCont.getElementsByClassName('ql-editor')[0]?.innerHTML;
  return html === '<p><br></p>' ? undefined : html;
};

export default getHtml;
