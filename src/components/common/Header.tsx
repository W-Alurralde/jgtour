import Container from "@/components/ui/Container";

export default function Header() {
  return (
    <header style={{ padding: "16px 0" }}>
      <Container>
        <img
          src="/logo-jgtravel.png"
          alt="JGTravel"
          style={{ height: 56 }}
        />
      </Container>
    </header>
  );
}