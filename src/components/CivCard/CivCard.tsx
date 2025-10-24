import { Card } from '@/components/bootstrap';
import { CivType } from '@/models/Civ';
import styles from "./CivCard.module.css"

interface CivCardProps {
    civ: CivType;
}

const CivCard = ({ civ }: CivCardProps) => {
    const { name, unique_unit, unique_tech, unique_buildings, team_bonus,
        civilization_bonus, expansion, army_type, } = civ;

    return (
        <Card bg="dark" text="light" border="secondary" className={`${styles.hoverStyles} user-select-none`}>
            <Card.Header as="h5">
                {name}
            </Card.Header>
            <Card.Subtitle className='mx-3 text-white-50'>{army_type}</Card.Subtitle>
            <Card.Body className='p-3'>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default CivCard;