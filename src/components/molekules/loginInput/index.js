import React from 'react';
import PropTypes from 'prop-types';
import { Gap } from '../../atoms';

class LoginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
        this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onEmailChangeHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value
            }
        })
    }

    onPasswordChangeHandler(event) {
        this.setState(() => {
            return {
                password: event.target.value
            };
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.login({
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className='login-input'>
                <Gap height={20} />
                <input type="email" placeholder='Email' value={this.state.email} onChange={this.onEmailChangeHandler} />
                <Gap height={20} />
                <input type="password" placeholder='Password' value={this.state.password} onChange={this.onPasswordChangeHandler} />
                <Gap height={20} />
                <button>Masuk</button>
                <Gap height={20} />
            </form>
        );
    }
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
}

export default LoginInput;