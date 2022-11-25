import { Button, Group, Modal, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Editor } from '@mantine/rte';
import { useEffect, useMemo, useRef } from 'react';
import RichTextEditor from './rich-text-editor';
import { AppRouterTypes, trpc } from '../../../utils/trpc';
import { BadgeList } from './badge/list';
import { PlanLessonItem } from './lesson';

interface Props {
  planId: string;
  item: Exclude<AppRouterTypes['planItem']['getByPlanId']['output'], undefined>[0];
  opened: boolean;
  closeModal: () => void;
}

export const PlanItemEditModal = ({ planId, item, opened, closeModal }: Props) => {
  const { data: badges } = trpc.planItem.getBadges.useQuery();
  const { data: materials } = trpc.referenceMaterial.getByPlanId.useQuery({ planId });
  const { mutateAsync } = trpc.planItem.update.useMutation();
  const utils = trpc.useContext();
  const editorRef = useRef<Editor>();
  const descriptionRef = useRef<string>();
  const hasEditedRef = useRef<boolean>();

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['#'],
      source: (searchTerm: string, renderList: (values: { id: string; value: string }[]) => void, mentionChar: string) => {
        const includesSearchTerm = materials?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        renderList(
          includesSearchTerm?.map((m) => ({
            id: m.id,
            value: m.name,
          })) ?? []
        );
      },
    }),
    [materials]
  );

  const form = useForm<FormType>({
    initialValues: {
      title: item.title ?? undefined,
      description: item.description ?? '',
      badges: item.badges,
    },
  });

  const resetForm = () => {
    form.setFieldValue('title', item.title ?? '');
    form.setFieldValue('description', item.description ?? '');
    form.setFieldValue('badges', item.badges);
  };

  useEffect(() => {
    resetForm();
  }, [item.title, item.description, item.badges]);

  const onClose = () => {
    resetForm();
    closeModal();
  };

  const handleSwitch = async (id: string, evaluated: boolean) => {
    const badges = [...form.values.badges];
    const index = badges.findIndex((x) => x.id === id);
    if (badges[index]) badges[index]!.evaluated = evaluated;
    form.setFieldValue('badges', badges);
  };

  const handleAddition = async (id: string) => {
    const badge = badges?.find((x) => x.id === id);
    if (!badge) return;
    form.insertListItem('badges', { id, evaluated: badge.name === 'exam' });
  };

  const handleRemoval = async (id: string) => {
    const index = form.values.badges.findIndex((x) => x.id === id);
    if (index === -1) return;
    form.removeListItem('badges', index);
  };

  const handleSubmit = async (values: FormType) => {
    await mutateAsync(
      {
        id: item.id,
        ...(values as unknown as any),
      },
      {
        onSuccess() {
          utils.planItem.getAll.invalidate();
          utils.planItem.getByPlanId.invalidate();
          utils.planItem.getBySubjectId.invalidate();
          utils.planItem.getNext.invalidate();
        },
      }
    );
    onClose();
  };

  return (
    <Modal size="xl" title={<Title order={3}>Lektion bearbeiten</Title>} opened={opened} onClose={onClose}>
      <Stack>
        <Stack spacing={4}>
          <Text weight={500} size="sm">
            Vorschau
          </Text>
          <PlanLessonItem
            item={{
              ...item,
              title: form.values.title ?? null,
              description: form.values.description ?? null,
              badges:
                form.values.badges?.map((x) => ({
                  ...x,
                  name: badges?.find((y) => y.id === x.id)?.name ?? 'unknown',
                })) ?? [],
            }}
          />
        </Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput {...form.getInputProps('title')} label="Thema" />
          <Stack spacing={4} mt="sm">
            <Text weight={500} size="sm">
              Beschreibung
            </Text>
            <RichTextEditor
              sx={{
                '>div.quill': {
                  height: 200,
                  overflowY: 'auto',
                  overflowX: 'visible',
                },
                '.ql-editor': {
                  minHeight: '100%',
                },
              }}
              mentions={mentions}
              id="rte"
              ref={editorRef}
              controls={[
                ['bold', 'italic', 'underline', 'clean'],
                ['unorderedList', 'link'],
              ]}
              defaultValue={item.description ?? ''}
              value={(() => {
                return form.values.description?.length === 0 ? undefined : JSON.parse(form.values.description ?? item.description ?? '{}');
              })()}
              onChange={() => {
                const current = JSON.stringify(editorRef.current?.editor?.getContents());
                if (descriptionRef.current === current || (current === '{"ops":[{"insert":"\\n"}]}' && hasEditedRef.current === false && item.description)) {
                  return;
                }
                hasEditedRef.current = true;
                descriptionRef.current = current;
                form.setFieldValue('description', current);
              }}
            />
          </Stack>
          <Stack spacing={4} mt="sm">
            <Text weight={500} size="sm">
              Badges
            </Text>
            <BadgeList mode="write" activeBadges={form.values.badges} handleSwitch={handleSwitch} handleAddition={handleAddition} handleRemoval={handleRemoval} />
          </Stack>
          <Group position="right">
            <Button variant="subtle" color="gray" onClick={onClose}>
              Abbrechen
            </Button>
            <Button variant="light" type="submit">
              Speichern
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

type FormType = {
  title?: string;
  description?: string;
  badges: { id: string; evaluated: boolean }[];
};
