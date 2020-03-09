import { auth, createUserProfileDocument } from '../../firebase/firebase.config';

export const authUser = () => {
    auth.onAuthStateChanged( async user => {
        // 如果用户登陆
        let data = null;
        if( user ){
            // firebase-onSnapshot()监听文档对象(快照对象)方便数据更新( 完成笔记 )
            // 0. onSnapshot(props=>{xx}) 用于监听快照对象,如果数据发生变化,方便数据变化时实时更新
            // 1. props用于传递快照对象的数据,于监听快照对象无疑
            const userRef = await createUserProfileDocument( user ); // React什么周期组件内,可以使用await等待异步数据( 完成笔记 )
            userRef.onSnapshot( props => {
                data = {
                    currentUser: {
                        id: props.id,
                        ...props.data()
                    }           
                };
            } );
        }
        return data;
    });
}