import { useState } from 'react';

import Alert from './components/Alert';
import Avatar from './components/Avatar';
import Counter from './components/Counter';
import Greeting from './components/Greeting';
import ProductList from './components/ProductList';
import ProfileCard from './components/ProfileCard';
import Status from './components/Status';
import Toggle from './components/Toggle';
import Container from './layouts/Container';

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    setIsOn((on) => !on);
  };

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Greeting name='Kevin' />
      <Greeting name='' />
      <Counter initialCount={13} />
      <Status status='success' />
      <ProfileCard user={{ name: 'Ada', age: 36 }} />
      <Alert message={'Hallo'} type='info' />
      <ProductList
        products={[
          { id: 1, title: 'Book' },
          { id: 4356, title: 'Pen' },
        ]}
      />
      <Toggle isOn={isOn} onToggle={onToggle} />
      <Toggle
        isOn={isOn}
        onToggle={(event) => {
          event.preventDefault();
          setIsOn((on) => !on);
        }}
      />
      <Avatar />
      <Avatar url={'https://i.pravatar.cc/50'} altText={'Profilbild einer zufälligen Person'} />
    </Container>
  );
};

export default App;
