/* eslint-disable react/destructuring-assignment */
// import React, { useState } from 'react';

// class RegisterInput extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: '',
//       email: '',
//       password: '',
//       avatar: null,
//     };
//     const [avatar, setAvatar] = useState(null);

//     this.onNameChange = this.onNameChange.bind(this);
//     this.onEmailChange = this.onEmailChange.bind(this);
//     this.onPasswordChange = this.onPasswordChange.bind(this);
//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//   }

//   onNameChange(event) {
//     this.setState(() => ({
//       name: event.target.value,
//     }));
//   }

//   onEmailChange(event) {
//     this.setState(() => ({
//       email: event.target.value,
//     }));
//   }

//   onPasswordChange(event) {
//     this.setState(() => ({
//       password: event.target.value,
//     }));
//   }

//   onAvatarChange(event) {
//     this.setState(() => ({
//       avatar: event.target.files[0],
//     }));
//   }

//   onSubmitHandler(event) {
//     event.preventDefault();

//     this.props.register({
//       name: this.state.name,
//       email: this.state.email,
//       avatar: this.state.avatar,
//       password: this.state.password,
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.onSubmitHandler} className="register-input">
//         <Gap height={28} />
//         <input
//           type="text"
//           placeholder="Nama"
//           value={this.state.name}
//           onChange={this.onNameChange}
//         />
//         <Gap height={36} />
//         <input
//           type="email"
//           placeholder="Email"
//           value={this.state.email}
//           onChange={this.onEmailChange}
//         />
//         <Gap height={36} />
//         <input
//           type="file"
//           placeholder="Avatar"
//           accept="image/*"
//           value={}
//           onChange={this.onAvatarChange}
//         />
//         <Gap height={36} />
//         <input
//           type="password"
//           placeholder="Password"
//           autoComplete="current-password"
//           value={this.state.password}
//           onChange={this.onPasswordChange}
//         />
//         <Gap height={16} />
//         <button type="button">Register</button>
//         <Gap height={12} />
//       </form>
//     );
//   }
// }

// RegisterInput.propTypes = {
//   register: PropTypes.func.isRequired,
// };

// export default RegisterInput;

import React, { useState } from 'react';
import axios from 'axios';
import './index.scss';

function RegisterInput() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    axios.post('http://localhost:5000/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="register-input">
        <div className="Text">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterInput;
