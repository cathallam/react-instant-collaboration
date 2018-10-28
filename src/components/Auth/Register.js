import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import{ Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';


// Set the set for the form
class Register extends React.Component {
state = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  errors: [],
  loading: false,
  usersRef: firebase.database().ref('users')
};

// Form Validation
isFormValid = () => {
  let errors = [];
  let error;

// Add errors state and concatenate the error message. Returning false should not execute handle submit
if (this.isFormEmpty(this.state)) {
  error = { message: 'Fill in all fields' };
  this.setState({ errors: errors.concat(error) });
  return false;
    
    // Throw an error
  } else if (!this.isPasswordValid(this.state)) {
    error = { message: "Password is invalid" };
    this.setState({ errors: errors.concat(error) });
    return false;
    // Throw error
  } else {
    // Form is valid
    return true;
  }
};
// Object destructuring for each individual value and check the values provided to each input is not empty
isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
  return !username.length || !email.length || !password.length || !passwordConfirmation.length
}

// Function to check if password is valid
isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
  return (
    !username.length ||
    !email.length ||
    !password.length ||
    !passwordConfirmation.length
  );
};

isPasswordValid = ({ password, passwordConfirmation }) => {
  if (password.length < 6 || passwordConfirmation.length < 6) {
    return false;
  } else if (password !== passwordConfirmation) {
    return false;
  } else {
    return true;
  }
};
// Create a function to display errrors to the user - i is the index of element that is iterating over. Put key prop on opening tag set equal to the index and show error message
displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

// Form registration to sign up a user 
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  // If statement for form validation and prevents reloading a page
  handleSubmit = event => {
    event.preventDefault(); 
    if (this.isFormValid()) { this.setState({ errors: [], loading: true });
      // Creating a promise to create a user 
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          // Store avatar
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log('user saved');
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

// Upon user registering the child method creates a unique user uid of the user object
saveUser = createdUser => {
  return this.state.usersRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  });
};

handleInputError = (errors, inputName) => {
  return errors.some(error => error.message.toLowerCase().includes(inputName))
    ? 'error'
    : '';
};


// Destructuring the value prop from state object and pass down to individual input componenent
  render() {
   const { username, email, password, passwordConfirmation, errors, loading } = this.state;
  
  
/* User registering. Destructuring the value prop from state object and pass down to individual input componenent. Button classname is a ternary loading value and check to see if loading set to true. If true loading spinner within the button  */
    return (
      <Grid textAlign='center' verticalAlign='middle' className='signup'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='teal' textAlign='center'>
          <Icon name='gg circle' color='black' />
          Register for Vice App
          </Header>
      <Form onSubmit={this.handleSubmit} size='large'> 
              <Segment stacked>
                <Form.Input fluid name='username' icon='user circle' iconPosition='left'
                  placeholder='Username' onChange={this.handleChange} value={username}
                  className={this.handleInputError(errors, 'username')} type='text'/>

                <Form.Input fluid name='email' icon='mail' iconPosition='left'
                  placeholder='Email' onChange={this.handleChange} value={email} 
                  className={this.handleInputError(errors, 'email')}
                  /*className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''} */
                  type='email'/>

                <Form.Input fluid name='password' icon='lock' iconPosition='left'
                  placeholder='Password' onChange={this.handleChange} value={password}  className={this.handleInputError(errors, 'password')} type='password'/>

                <Form.Input fluid name='passwordConfirmation' icon='repeat' iconPosition='left'placeholder='Password Confirmation' 
                onChange={this.handleChange} value={passwordConfirmation}
                className={this.handleInputError(errors, 'password')}
                type='password'/>
               
                <Button disabled={loading} className={loading ? 'loading': ''} color='teal' fluid size='large'>Submit</Button>
            </Segment>   
          </Form>

          <Message>Already a user? <Link to='/login'>Login</Link></Message>
        
        {errors.length > 0 && (
        // Refactor code - Errors.length replaces this.state.errors and displays errors to user
          <Message error>
          <h4>Oh no! Please try again</h4>
          {this.displayErrors(errors)}
          </Message>
        )} 
        </Grid.Column>
      </Grid>
         );
        }
      }
export default Register;