import { Button, Container, Title } from '@mantine/core';
import { Editor } from '@mantine/rte';
import { useRef } from 'react';
import { BasicLayout } from '../layout/basic';
import RichTextEditor from './__test';

function MyPage() {
  const editorRef = useRef<Editor>();

  return (
    <BasicLayout>
      <Container>
        <Title order={2}>Rich Text Editor</Title>
        <Button
          onClick={() => {
            console.log(editorRef.current?.getEditorContents());
          }}
        >
          Get Data
        </Button>
        <RichTextEditor id="rte" ref={editorRef} />
      </Container>
    </BasicLayout>
  );
}

export default MyPage;
