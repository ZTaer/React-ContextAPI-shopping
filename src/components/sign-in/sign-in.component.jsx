import React,{ useState } from "react";
import "./sign-in.style.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.config";

const SignIn = () => {

    const [ emailPassword, setEmailPassword ] = useState({ email:'', password:'' });

    const handleSubmit = async cur => {
        cur.preventDefault();    
        try{
            // firebase登陆用户函数( 完成笔记 )
                // 0. signInWithEmailAndPassword(email,password)
            await auth.signInWithEmailAndPassword( emailPassword.email, emailPassword.password );
            setEmailPassword({ email:'', password:'' });
        }
        catch(err){
            alert(err.message);
        }
        
    }

    const handleChange = cur => {
        const { value, name } = cur.target;
        setEmailPassword({ ...emailPassword, [name]: value });
    }

    return(
        <div className="sign-in">
            <h2>
                登陆用户
            </h2>
            <span>
                请使用邮箱和密码登陆
            </span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="邮箱" 
                    handleChange={handleChange} 
                    type="email" 
                    name="email" 
                    value={ emailPassword.email } required  
                />

                <FormInput 
                    label="密码" 
                    handleChange={handleChange} 
                    type="password" 
                    name="password" 
                    value={ emailPassword.password } required  
                />
                <div className="btn-sign">
                    <CustomButton selfCss={`sign-width`} type="submit" >
                        登陆
                    </CustomButton>
                    <CustomButton selfCss={`sign-width google-btn-color`}  onClick={ signInWithGoogle } >
                        Google登陆
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;