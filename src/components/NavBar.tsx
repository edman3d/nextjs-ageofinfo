"use client";

import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} href="/">
                    NextJS AoE2 Navbar
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/civs" active={pathname === "/civs"}>Civilizations</Nav.Link>
                        <Nav.Link as={Link} href="/units" active={pathname === "/units"}>Units</Nav.Link>
                        <NavDropdown title="Downloads" id="downloads-dropdown">
                            <NavDropdown.Item as={Link} href="/downloads/units">Units CSV</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/downloads/civs">Civs CSV</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}