<template>
       <b-container class="d-flex justify-content-center h-100 align-items-center">
        <b-card class="border-0 shadow login-card" header-bg-variant="primary">
            <template v-slot:header>
               <h5 class="mb-2 text- text-center"> <fa :icon="['fas', 'user']"/>  User Registration </h5> 
            </template>
            <b-form>
                <b-form-group 
                    label="First Name:">
                    <b-form-input  v-model="user.userFirstName" size="sm" required placeholder="First name"></b-form-input>
                </b-form-group>
                <b-form-group 
                    label="Last Name:">
                    <b-form-input v-model="user.userLastName" size="sm" required placeholder="Last name"></b-form-input>
                </b-form-group>
                <b-form-group 
                    label="Email address:">
                    <b-form-input v-model="user.email" size="sm" type="email" required placeholder="Enter Email"></b-form-input>
                </b-form-group>
                <b-form-group 
                    label="Password:">
                    <b-form-input v-model="user.password" size="sm" type="password" required placeholder="Enter Password"></b-form-input>
                </b-form-group>
                <div class="text-center">
                    <!-- <b-btn variant="outline-primary" size="sm" class="btn-block">Sign In</b-btn> -->
                    <b-btn @click="createUser" variant="primary" size="sm" class="btn-block" to="/register">Create an account</b-btn>
                    <!-- <b-btn variant="light" size="sm" class="btn-block shadow-sm"><img src="@/assets/icons/facebook-icon.svg" width="18" alt="facebook"> Sign in with Facebook</b-btn> -->
                    <!-- <b-btn variant="light" size="sm" class="btn-block shadow-sm"><img src="@/assets/icons/google-icon.svg" width="18" alt="google"> Sign in with Google</b-btn>  -->
                </div>
            </b-form>
        </b-card>
    </b-container>

 </template>

<script>
import {
    createUser,
    
    } from '@/services';

export default {
   data: () => ({
      user: {
            userFirstName: '',
            userLastName: '',
            email: '',
            password: ''
            },
    }),

    methods: {
        async createUser() {
            console.log(this.user.userFirstName + " "  + this.user.email + "  " + this.user.password);
            try{
                const response = await createUser(this.user);
                this.$router.push('login')
                console.log(response.data);
            }catch(err) {
                console.log(err.response);
            }
        },
    }
}
</script>

<style lang="scss">
    .login-card{
        width: 450px;
    }
</style>