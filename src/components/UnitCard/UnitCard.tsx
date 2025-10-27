"use client";
// import Card from 'react-bootstrap/Card';
import { Card, Spinner } from "react-bootstrap";
import { UnitType } from '@/models/Unit';
import Link from "next/link";
import { fetchData } from "@/lib/fetchData";
import { useEffect, useState } from "react";

interface UnitCardProps {
    unitName: string;
}

const UnitCard = ({ unitName }: UnitCardProps) => {

    const [unit, setUnit] = useState<UnitType | null>(null);
    const [unitLoading, setUnitLoading] = useState(false);
    const [unitLoadingError, setUnitLoadingError] = useState(false);

    useEffect(() => {
        async function loadUnit() {
            try {
                setUnitLoadingError(false);
                setUnitLoading(true);
                // const unitData: UnitType = await fetchData(`/api/units?name${unitName}`);
                const unitData: UnitType = await fetchData(`/api/units?name=${unitName}`);
                setUnit(unitData);
            } catch (error) {
                console.error(error);
                setUnitLoadingError(true);
            } finally {
                setUnitLoading(false);
            }
        }
        loadUnit();
    }, []);

    return (
        <>
            {unitLoading && <Spinner animation='border' variant='primary' />}
            {unitLoadingError && <p>Couldn't find unit called {unitName}. Please refresh the page.</p>}
            {!unitLoading && !unitLoadingError && unit &&
                <Card bg="dark" text="light" border="secondary" className={`user-select-none h-100`}>
                    <Card.Header as="h5">
                        Name: {unit.name}
                    </Card.Header>
                    <Card.Subtitle className='mx-3 text-white-50'>Subtitle</Card.Subtitle>
                    <Card.Body className='p-3'>
                        <Card.Text>
                            Text
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
        </>
    );

    // return (
    // <Card bg="dark" text="light" border="secondary" className={`user-select-none h-100`}>
    //     <Card.Header as="h5">
    //         {unitName}
    //     </Card.Header>
    //     <Card.Subtitle className='mx-3 text-white-50'>unit</Card.Subtitle>
    //     <Card.Body className='p-3'>
    //         <Card.Text>
    //             unit
    //         </Card.Text>
    //     </Card.Body>
    // </Card>
    // );
}

export default UnitCard;