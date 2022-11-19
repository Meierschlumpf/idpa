import type { RichTextEditorProps } from '@mantine/rte';
import React from 'react';

const RichTextEditorComponent = React.forwardRef((props: RichTextEditorProps, ref) => {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // eslint-disable-next-line import/extensions, global-require
    const { RichTextEditor } = require('@mantine/rte');
    return <RichTextEditor ref={ref} {...props} />;
  }

  // Render anything as fallback on server, e.g. loader or html content without editor
  return null;
});

export default RichTextEditorComponent;
