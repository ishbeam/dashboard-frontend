import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'baseui/button';

import { list as listTerminals } from '../../api/terminals';

class Terminals extends Component {

    constructor(props) {
        super(props)

        this.state = {
            terminals: []
        }
    }

    componentDidMount() {
        listTerminals().then(({ data }) => {
            console.log('TERMINALS', data)
            this.setState({ terminals: data })
        })
    }

    render() {
        const { terminals } = this.state;

        return (
            <div>
                <div className="full-width bg-black">
                    <div className="container pt-4 pb-8">
                        <h1 className="fontSize5 fontMedium white">Terminals</h1>
                    </div>
                </div>

                <div className="container">
                    {terminals.map((t) => (
                        <div className="card inner_2 mb-2" onClick={(e) => console.log('navigate to terminal detail')}>
                            <h1 >{t.name}</h1>
                            <div>
                                {t.suppliers.map((s) => (
                                    <div>
                                        <p>{s.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Button className="primary button" onClick={() => this.props.history.push('/supplier/terminals/add')}>Add Terminal</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Terminals)