import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import{ Link } from 'react-router-dom';
import firebase from '../../firebase';

// Set the set for the form
class Login extends React.Component {
state = {
  email: '',
  password: '',
  errors: [],
  loading: false,
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
    if (this.isFormValid(this.state)) { this.setState({ errors: [], loading: true });
    firebase   
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      })
    }
  };
// check there is a email and password
  isFormValid =({ email, password}) => email && password;

handleInputError = (errors, inputName) => {
  return errors.some(error => error.message.toLowerCase().includes(inputName))
    ? 'error'
    : '';
};


// Destructuring the value prop from state object and pass down to individual input componenent
  render() {
   const { email, password, errors, loading } = this.state;
  
  
/* User registering. Destructuring the value prop from state object and pass down to individual input componenent. Button classname is a ternary loading value and check to see if loading set to true. If true loading spinner within the button  */
    return (
      <Grid textAlign='center' verticalAlign='middle' className='signup'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='teal' textAlign='center'>
          <Icon name='gg circle' color='black' />
          Login in Vice App
          </Header>
      <Form onSubmit={this.handleSubmit} size='large'> 
            <Segment stacked>
              
                <Form.Input fluid name='email' icon='mail' iconPosition='left'
                  placeholder='Email' onChange={this.handleChange} value={email} 
                  className={this.handleInputError(errors, 'email')}
                  /*className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''} */
                  type='email'/>

                <Form.Input fluid name='password' icon='lock' iconPosition='left'
                  placeholder='Password' onChange={this.handleChange} value={password}  className={this.handleInputError(errors, 'password')} type='password'/>
               
                <Button disabled={loading} className={loading ? 'loading': ''} color='teal' fluid size='large'>Submit</Button>
            </Segment>   
        </Form>

        <Message>Wanna join vice? <Link to='/register'>Register</Link></Message>
        
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

export default Login;