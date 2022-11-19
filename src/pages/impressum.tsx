import { Container, List, Stack, Text, Title } from '@mantine/core';
import { BasicLayout } from '../layout/basic';

const ImpressPage = () => {
  return (
    <BasicLayout>
      <Container>
        <Stack>
          <Title order={2}>Impressum</Title>
          <Text>
            Die Inhalte dieses Webprojektes wurden sorgfältig geprüft und nach bestem Wissen erstellt. Aber für die hier dargebotenen Informationen wird kein Anspruch auf Vollständigkeit, Aktualität
            und Richtigkeit erhoben. Es kann keine Verantwortung für Schäden übernommen werden, die durch das Vertrauen auf die Inhalte dieser Website oder deren Gebrauch entstehen. Trotz sorgfältiger
            inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.
          </Text>
          <Title order={3}>Adresse</Title>
          <List spacing={0} size="md" listStyleType="none">
            <List.Item>Meier Lukas</List.Item>
            <List.Item>Kapellenstrasse 2</List.Item>
            <List.Item>1716 Plaffeien</List.Item>
          </List>
          <Title order={3}>Kontakt</Title>
          <List spacing={0} size="md" listStyleType="none">
            <List.Item>Telefon: +41 77 486 52 32</List.Item>
            <List.Item>Mail: lme121188@iet-gibb.ch</List.Item>
          </List>
        </Stack>
      </Container>
    </BasicLayout>
  );
};

export default ImpressPage;
