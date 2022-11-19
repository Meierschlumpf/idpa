import { MantineProvider } from '@mantine/core';
import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body data-color-scheme="dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
