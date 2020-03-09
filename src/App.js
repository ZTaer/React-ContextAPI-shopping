import React,{ useEffect, useContext } from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignPage from './pages/signpage/signpage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.config';

import { UserContext } from './providers/user/user.provider';

const App = () => {
  const { currentUser ,changeCurrentUser } = useContext( UserContext );

  useEffect( ()=>{

    let unsubscribeFromAuth = () => auth.onAuthStateChanged( async user => {
      // 如果用户登陆
      if( user ){
        // firebase-onSnapshot()监听文档对象(快照对象)方便数据更新( 完成笔记 )
          // 0. onSnapshot(props=>{xx}) 用于监听快照对象,如果数据发生变化,方便数据变化时实时更新
          // 1. props用于传递快照对象的数据,于监听快照对象无疑
        const userRef = await createUserProfileDocument( user ); // React什么周期组件内,可以使用await等待异步数据( 完成笔记 )
        userRef.onSnapshot( props => {
          changeCurrentUser({
              id: props.id,
              ...props.data()
          });

        } );
      }
    });
    unsubscribeFromAuth();

    return ()=>{
      unsubscribeFromAuth = null;
    }
    
  },[] );

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/sign' render={ ()=> currentUser ? <Redirect to='/' /> : <SignPage />  } />
        <Route exact path='/checkout' component={CheckoutPage} />
      </Switch>
    </div>
  );
};

export default App;