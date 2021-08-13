import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, ChangeEvent } from 'react';

import { Login, Register } from './../redux/actions/Authenticate';

interface DefaultFormI {
  userEmail: string,
  password: string,
  confirmPassword: string,
}

const Authenticate = () => {
  const [showPassword, setShowPassword] = useState<string>('password');
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [form, setForm] = useState<DefaultFormI>({
    userEmail: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const history: any = useHistory();

  const handleShowPassword = () => {
    setShowPassword((previousShowPassword) => (previousShowPassword === 'password' ? 'text' : 'password'));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isRegister) {
      // dispatch an action to signup
      if (form.userEmail && form.password && form.confirmPassword) {
        // include extra validation here to check that they have a leagueOfLegends accout
        if (form.password === form.confirmPassword) dispatch(Register(form, history)); 
        else {
          setForm(current => ({...current, password: '', confirmPassword: ''}));
          alert(`Passwords don't match, try again`);
        }
      } else alert(`Please fill out all fields`);
      
    } else {
      if (form.userEmail && form.password) /* dspatch an action to sign-in */ dispatch(Login(form, history));
      else alert(`Please fill out all fields`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchIsRegister = () => {
    setIsRegister(!isRegister);
    setShowPassword('password');
  };
  // use chalkra to create the layout
  return (
    <div>

       
        <form  onSubmit={(e) => handleSubmit(e)} noValidate>
        
        </form>
    </div>
    
  );
};

export default Authenticate;