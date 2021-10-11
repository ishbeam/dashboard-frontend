import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

import { invite } from '../../api/users';

class AddDriver extends Component {

    constructor() {
        super()

        this.state = {
            name: '',
            email: ''
        }
    }

    onSubmit = async () => {
        const { name, email } = this.state;

        const driver = {
            name,
            email,
            company: {
                role: 'driver'
            }
        }

        const d = await invite(driver)

        this.props.history.goBack()
        console.log(d)

    }

    render() {
        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Add Driver</h1>
                    </div>
                </div>



                <div className="container">
                    <div>
                        <Input onChange={(e) => this.setState({ name: e.target.value })} placeholder="Name" />
                        <Input onChange={(e) => this.setState({ email: e.target.value })} placeholder="Email" />
                        <Button onClick={this.onSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddDriver)