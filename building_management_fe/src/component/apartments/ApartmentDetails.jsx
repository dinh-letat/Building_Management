import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import fetchURL from '../../api/AxiosInstance';

const ApartmentDetails = () => {
    const { id } = useParams(); // Get the apartment ID from the URL
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await fetchURL(`/api/apartments/${id}`); // Fetching apartment details by ID
                setApartment(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApartmentDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!apartment) return <div>No apartment data available</div>;

    return (
        <Container>
            <h3>Apartment Details</h3>
            <Card>
                <Card.Body>
                    <Card.Title>{apartment.apartment_name}</Card.Title>
                    <Card.Text>
                        <strong>Area:</strong> {apartment.area} m²
                    </Card.Text>
                    <Card.Text>
                        <strong>Number of Rooms:</strong> {apartment.number_of_room}
                    </Card.Text>
                    <Card.Text>
                        <strong>Price:</strong> {apartment.price} VND
                    </Card.Text>
                    <Card.Text>
                        <strong>Status:</strong> {apartment.status}
                    </Card.Text>
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ApartmentDetails;
