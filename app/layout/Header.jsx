import React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Image from 'react-bootstrap/lib/Image';

export default class Header extends React.Component {
    render() {
        return <PageHeader>Tasty <Image id="imgTasty" src="assets/images/tasty.png" /> Ui</PageHeader>
    }
}