import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


export default function LoadIcon() {
    return (
        <Button data-testid="loadIcon" className='spinner-container' variant="primary" disabled>
            <Spinner
                animation="border"
                size="sm"
            />
            <span> Loading...</span>
        </Button>
    );
}