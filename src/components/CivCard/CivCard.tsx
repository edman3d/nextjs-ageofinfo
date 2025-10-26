import { Card } from '@/components/bootstrap';
import { CivType } from '@/models/Civ';
import styles from "./CivCard.module.css"
import Link from "next/link";

interface CivCardProps {
    civ: CivType;
}

const CivCard = ({ civ }: CivCardProps) => {
    const { name, unique_unit, unique_tech, unique_buildings, team_bonus,
        civilization_bonus, expansion, army_type, } = civ;

    return (
        <Card as={Link} bg="dark" text="light" border="secondary" href={`/civs/${name}`} className={`${styles.hoverStyles} user-select-none h-100 text-decoration-none`}>
            <Card.Header as="h5">
                {name}
            </Card.Header>
            <Card.Subtitle className='mx-3 text-white-50'>{army_type}</Card.Subtitle>
            <Card.Body className='p-3'>
                <Card.Text>
                    {team_bonus}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CivCard;