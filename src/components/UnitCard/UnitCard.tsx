"use client";
import Image from "next/image";
import { fetchData } from "@/lib/fetchData";
import { UnitType } from '@/models/Unit';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import styles from "./UnitCard.module.css";

interface UnitCardProps {
    unitData?: UnitType; // Pass in data to avoid fetching again
    unitName?: string;
}

const UnitCard = ({ unitData, unitName }: UnitCardProps) => {

    const [unit, setUnit] = useState<UnitType | null>(unitData || null);
    const [unitLoading, setUnitLoading] = useState(false);
    const [unitLoadingError, setUnitLoadingError] = useState(false);

    const getIconSrc = (u: UnitType | null) => {
        if (!u) return '/icons/units/default.png';
        return `/icons/units/${u.image}.png`;
    };

    const [iconSrc, setIconSrc] = useState<string>(() => getIconSrc(unit));

    useEffect(() => {
        setIconSrc(getIconSrc(unit));
    }, [unit]);

    useEffect(() => {
        async function loadUnit() {
            try {
                setUnitLoadingError(false);
                setUnitLoading(true);
                const unitData: UnitType = await fetchData(`/api/units?name=${unitName}`);
                setUnit(unitData);
            } catch (error) {
                console.error(error);
                setUnitLoadingError(true);
            } finally {
                setUnitLoading(false);
            }
        }
        if (!unitData) {
            loadUnit();
        }

    }, []);

    return (
        <>
            {unitLoading && <Spinner animation='border' variant='primary' />}
            {unitLoadingError && <p>Couldnt find unit called {unitName}. Please refresh the page.</p>}
            {!unitLoading && !unitLoadingError && unit &&
                <Card
                    as={Link}
                    bg="dark"
                    text="light"
                    border="secondary"
                    href={`/units/${unit.name}`}
                    prefetch={false}
                    className={`${styles.hoverStyles} user-select-none h-100 text-decoration-none`}
                >
                    <Card.Header as="h5" >
                        <div className="d-flex align-items-center">
                            <Image
                                src={iconSrc}
                                alt={`${unit.name} icon`}
                                width={48}
                                height={48}
                                className="me-2 rounded"
                                onError={() => setIconSrc('/icons/units/default.png')}
                            />
                            <span>{unit.name}</span>
                        </div>
                    </Card.Header>
                    <Card.Subtitle className='mx-3 text-white-50'>{unit.type}</Card.Subtitle>
                    <Card.Body className='p-3'>
                        <Card.Text>
                            {unit.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
        </>
    );
}

export default UnitCard;