"use client";
import { fetchData } from "@/lib/fetchData";
import { UnitType } from '@/models/Unit';
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

interface UnitCardProps {
    unitName: string;
}

const UnitCard = ({ unitName }: UnitCardProps) => {

    const [unit, setUnit] = useState<UnitType | null>(null);
    const [unitLoading, setUnitLoading] = useState(false);
    const [unitLoadingError, setUnitLoadingError] = useState(false);

    const getIconSrc = (u: UnitType | null) => {
        if (!u) return '/icons/units/default.png';
        return `/icons/units/${u.image}.png`;
    };

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
        loadUnit();
    }, []);

    return (
        <>
            {unitLoading && <Spinner animation='border' variant='primary' />}
            {unitLoadingError && <p>Couldn't find unit called {unitName}. Please refresh the page.</p>}
            {!unitLoading && !unitLoadingError && unit &&
                <Card bg="dark" text="light" border="secondary" className={`user-select-none h-100`}>
                    <Card.Header as="h5" >
                        <div className="d-flex align-items-center">
                            <img
                                src={getIconSrc(unit)}
                                alt={`${unit.name} icon`}
                                width={48}
                                height={48}
                                className="me-2 rounded"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/icons/units/default.png'; }}
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