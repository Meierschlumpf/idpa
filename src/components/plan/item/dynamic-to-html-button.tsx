import { Delta } from 'quill';

const getHtml = (inputDelta: Delta) => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const { Quill } = require('@mantine/rte');

  var tempCont = document.createElement('div');
  new Quill(tempCont).setContents(inputDelta);
  const html = tempCont.getElementsByClassName('ql-editor')[0]?.innerHTML;
  return html === '<p><br></p>' ? undefined : html;
};

export default getHtml;
