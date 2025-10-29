"use client";

import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavBar() {
    const pathname = usePathname();

    // Using scroll={true} on next/link components to auto scroll to the top of the page
    // only works the second time you click the click because god forbid anything actually
    // works the way its supposed to so just force it when the URL changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [pathname]);

    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} scroll={true} href="/">
                    NextJS AoE2 Navbar
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} scroll={true} href="/civs" active={pathname === "/civs"}>Civilizations</Nav.Link>
                        <Nav.Link as={Link} scroll={true} href="/units" active={pathname === "/units"}>Units</Nav.Link>
                        <NavDropdown title="Downloads" id="downloads-dropdown">
                            <NavDropdown.Item as={Link} scroll={true} href="/downloads/units">Units CSV</NavDropdown.Item>
                            <NavDropdown.Item as={Link} scroll={true} href="/downloads/civs">Civs CSV</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}