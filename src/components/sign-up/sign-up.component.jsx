import React,{useState} from 'react';
import "./sign-up.style.scss";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.config';
import { withRouter } from 'react-router-dom';

const SignUp = ({ history }) => {

    const [ data, setData ] = useState({
        email: '',
        password: '',
        displayName: '',
        confirmPassword: '',
    });

    const handleSubmit = async cur => {
        cur.preventDefault();
        const { displayName, email, password, confirmPassword } = data;
        if( password !== confirmPassword ){
            alert('二者密码不相同,请重新输入');
            return;
        }
        try{
            // firebase创建用户函数( 完成笔记 ) 
                // 0. auth.createUserWithEmailAndPassword( email, password )创建用户
                // 1. 成功: 则返回创建用户信息
                // 2. 失败: 则返回失败原因
                // 3. 注意: 要在Firebase控制台开启'允许用户使用电子邮件和密码注册'
            let createUser = await auth.createUserWithEmailAndPassword( email, password );
            await createUserProfileDocument( createUser.user, {displayName} ); // 吐血~这个createUser,应该返回createUser.user!!!!无语!!!!
            alert('注册成功');

            setData({
                email: '',
                password: '',
                displayName: '',
                confirmPassword: '',
            });

            // 跳转到主页
            history.push('/');
            
        }
        catch( err ){
            // 在控制台显示红色错误信息( 完成笔记 )
            console.error(err);
            alert( err.message );
        }
        
    }

    const handleChange = props => {
        const { name, value } = props.target;
        setData({ ...data ,[name]: value });
    }

    return(
        <div className="sign-up">
            <h2>
                注册用户
            </h2>
            <span>
                请使用邮箱和密码注册
            </span>

            <form onSubmit={handleSubmit} >
                    
                <FormInput 
                    label='邮箱'
                    type='email'
                    name='email'
                    handleChange={handleChange}
                    value={data.email} required="required"
                /> 
                <FormInput 
                    label='名称'
                    type='text'
                    name='displayName'
                    handleChange={handleChange}
                    value={data.displayName}
                    required
                /> 
                <FormInput 
                    label="密码" 
                    handleChange={handleChange} 
                    type="password" 
                    name="password" 
                    value={data.password} required  
                />
                <FormInput 
                    label='确认密码'
                    type='password'
                    name='confirmPassword'
                    handleChange={handleChange}
                    value={data.confirmPassword}
                    required
                />
                <CustomButton 
                type="submit"
                selfCss={`sign-width`} 
                >
                    提交
                </CustomButton>
            </form> 
        </div>
    );
}

export default withRouter(SignUp);