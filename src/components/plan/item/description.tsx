import { TypographyStylesProvider } from '@mantine/core';
import { MouseEvent, useEffect, useRef } from 'react';
import getHtml from './dynamic-to-html-button';

export const ItemDescription = ({ description }: { description: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mentionRefs = useRef<HTMLCollectionOf<Element>>();

  useEffect(() => {
    mentionRefs.current = wrapperRef.current?.getElementsByClassName('mention');
    const handleClick = (ev: MouseEvent) => {
      const referenceId = ev.currentTarget.getAttribute('data-id');
      window.open(`/api/referenceMaterials/${referenceId}`, '_blank')?.focus();
    };
    const length = mentionRefs.current?.length;
    if (!length) return;
    for (let i = 0; i < length; i++) {
      mentionRefs.current?.item(i)?.addEventListener('click', handleClick as any);
    }

    return () => {
      const length = mentionRefs.current?.length;
      if (!length) return;
      for (let i = 0; i < length; i++) {
        mentionRefs.current?.item(i)?.removeEventListener('click', handleClick as any);
      }
    };
  }, [description]);

  return (
    <TypographyStylesProvider ref={wrapperRef}>
      <div dangerouslySetInnerHTML={{ __html: getHtml(JSON.parse(description)) ?? '' }} />
    </TypographyStylesProvider>
  );
};
