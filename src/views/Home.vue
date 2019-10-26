<template>
   <b-container class="d-flex flex-column justify-content-center h-100 align-items-center">
   <!-- <b-container class="home"> -->
     <b-img-lazy src="@/assets/img/SJSUPrimary-mark_4cp.png" alt="SJSUPrimary" /> 
     <b-img-lazy src="@/assets/img/SpartanSpirit-blue.png" width="200"  alt="SJSUPrimary" />
   </b-container>
</template>

<script>
//if required write a code here not for project 1
// import { AmplifyEventBus } from 'aws-amplify-vue';
// import { Auth } from 'aws-amplify';
// export default {
//    mounted() {
//     AmplifyEventBus.$on('authState', async info => {
//       let isAdmin = await Auth.currentSession();
//       isAdmin = isAdmin.accessToken.payload['cognito.groups'][0];
//       console.log(isAdmin);
//       switch(info) {
//                 case 'signedOut' :
//                    this.$store.dispatch('auth/setLoggedIn', false)
//                    this.$router.push('/login');
//                    break;
//                 case 'signedIn' :
//                     this.$store.dispatch('auth/setLoggedIn', {isLoggedIn: true, isAdmin: (isAdmin == 'Admin')});
//                     isAdmin === 'Admin' ? this.$router.push('/admin') : this.$router.push('/user');  
//                     break;
//                 default:
//                     // this.$router.push('/home');
//                     break;
//             }
//     })
//   }
// }
</script>
