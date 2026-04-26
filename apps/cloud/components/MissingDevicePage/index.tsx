import { Card, Container, Description, Steps, Title } from "./styles";

export default function MissingDevicePage() {
  return (
    <Container>
      <Card>
        <Title>No Raspberry Pi Linked</Title>
        <Description>
          No device is linked to this account yet. Connect a Raspberry Pi to
          this account before continuing.
        </Description>
      </Card>
    </Container>
  );
}
