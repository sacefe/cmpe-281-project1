<template>
    <b-container class="d-flex h-100 align-items-center justify-content-center">
        <amplify-authenticator :authConfig="authConfig"></amplify-authenticator>
    </b-container>
 </template>


<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
//import { AmplifyEventBus, components } from 'aws-amplify-vue';
import {Auth} from 'aws-amplify';
export default {
   data: () => ({
        authConfig: {
              hideAllDefaults: true,
               defaultCountryCode: '1',
            signUpConfig: {
                signUpFields: [
                    {
                        label: 'Email',
                        key: 'email',
                        required: true,
                        displayOrder: 1,
                        type: 'string',
                        signUpWith: true
                    },
                    {
                        label: 'Password',
                        key: 'password',
                        required: true,
                        displayOrder: 2,
                        type: 'password'
                    },

                    {
                        label: 'First name:',
                        key: 'firstName',
                        type: 'string',
                        custom: true
                    },
                    {
                        label: 'Last name:',
                        key: 'lastName',
                        type: 'string',
                        custom: true
                    },
                    {
                        label: 'PhoneNumber',
                        key: 'phone_number',
                        required: false,
                       type: 'string'
                    },
                ]
            }
        },
    }), 
    // components: {
    //     ...components
    // },
     mounted() {
        AmplifyEventBus.$on('authState', async (info) => {
            try {
                let isAdmin = await Auth.currentSession();
                console.log(isAdmin);
                isAdmin = isAdmin.accessToken.payload['cognito:groups'][0];
                switch(info) {
                case 'signedIn' :
                    this.$store.dispatch('auth/setLoggedIn', {isLoggedIn:true, isAdmin: (isAdmin === 'Admin')});
                    isAdmin === 'Admin' ? this.$router.push('/admin') : this.$router.push('/dashboard');
                    break;
                default:
                    break;
            }
            } catch(err) {
              console.log(err);
            }
            
        });
    }
}
</script>


<style lang="scss">
    .login-card{
        width: 450px;
    }
</style>