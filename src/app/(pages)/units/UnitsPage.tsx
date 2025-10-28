"use client";

import { fetchData } from "@/lib/fetchData";
import { UnitType } from "@/models/Unit";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import CivCard from "@/components/CivCard/CivCard";
import Link from "next/link";
import UnitCard from "@/components/UnitCard/UnitCard";

export default function UnitsPage() {
    const [units, setUnits] = useState<UnitType[] | null>(null);
    const [unitsLoading, setUnitsLoading] = useState(false);
    const [unitLoadingError, setUnitisLoadingError] = useState(false);

    useEffect(() => {
        async function loadUnits() {
            try {
                setUnitisLoadingError(false);
                setUnitsLoading(true);
                const unitData: UnitType[] = await fetchData(`/api/units`);
                setUnits(unitData);
            } catch (error) {
                console.error(error);
                setUnitisLoadingError(true);
            } finally {
                setUnitsLoading(false);
            }
        }
        loadUnits();
    }, []);

    const unitsGrid =
        <Row xs={1} md={3} xl={4} className={`g-2`}>
            {units?.map(unit => (
                <Col key={unit._id?.toString()}>
                    <UnitCard unitData={unit} />
                </Col>
            ))}
        </Row>

    return (
        <>
            {unitsLoading && <Spinner animation='border' variant='primary' />}
            {unitLoadingError && <p>Something went wrong. Please refresh the page.</p>}
            {!unitsLoading && !unitLoadingError && units &&
                <>
                    {units.length > 0
                        ? unitsGrid
                        : <p>No Units were found.</p>
                    }
                </>
            }
        </>
    );
}