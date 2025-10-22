"use client";

import { fetchData } from "@/lib/fetchData";
import { CivType } from "@/models/Civ";
import { FormEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CivsPage() {
    const [civs, setCivs] = useState<CivType[] | null>(null);
    const [civsLoading, setCivsLoading] = useState(false);
    const [civsLoadingError, setCivsLoadingError] = useState(false);

    // useEffect function
    useEffect(() => {
        async function loadCivs() {
            try {
                setCivsLoadingError(false);
                setCivsLoading(true);
                console.log(process.env.VERCEL_URL);
                console.log(process.env.NEXT_PUBLIC_BASE_URL);
                // const civResponse = await fetchData(`/api/civs`);
                // const civData: CivType[] = await civResponse.json();
                const civData: CivType[] = await fetchData(`/api/civs`);
                setCivs(civData);
            } catch (error) {
                console.error(error);
                setCivsLoadingError(true);
            } finally {
                setCivsLoading(false);
            }
        }
        loadCivs();
    }, []);

    const civsGrid =
        <Row xs={1} md={2} xl={3} className={`g-4`}>
            {civs?.map(civ => (
                <Col key={civ.id}>
                    <div>{civ.name} | {civ.army_type}</div>
                </Col>
            ))}
        </Row>

    return (
        <>
            {civsLoading && <Spinner animation='border' variant='primary' />}
            {civsLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!civsLoading && !civsLoadingError && civs &&
                <>
                    {civs.length > 0
                        ? civsGrid
                        : <p>No Civilizations were found.</p>
                    }
                </>
            }
        </>
    );
}