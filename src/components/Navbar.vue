<template>
   <b-navbar toggleable="sm" variant="white" type="primary" class="shadow">
       <b-container>
            <b-navbar-brand to="/" class= "text-primary">  
                 <fa :icon="['fab','aws']" />  CMPE-281 Project # 1
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
    
                <b-navbar-nav class="ml-auto">
                  <b-nav>      
                    <b-nav-item v-if="!isLoggedIn" to="/login">Register/Login   <fa :icon="['fas', 'user']"/>  </b-nav-item>
                    <b-nav-item-dropdown :text="`Hi! ${firstName}`" v-if="isLoggedIn" right>
                      <b-dropdown-item>
                        <amplify-sign-out v-bind:signOutConfig="signOutConfig"></amplify-sign-out>
                      </b-dropdown-item>
                    </b-nav-item-dropdown>
                  </b-nav>
                </b-navbar-nav>

            </b-collapse>
       </b-container>
    </b-navbar>
</template>

<script>
import {Auth} from 'aws-amplify';
import {AmplifyEventBus} from 'aws-amplify-vue';
export default {
  data: () => ({
    firstName: '',
    signOutConfig: {
    },
    
  }),
  computed: {
    isLoggedIn: function() {
      if(this.$store.getters['auth/isLoggedIn']) {
        this.setUser();
        return true;
      } else return false;
    }
  },
  methods: {
    setUser: async function() {
      try{
        const response = await Auth.currentAuthenticatedUser();
         this.firstName = response.attributes['custom:firstName'];
      } catch(err) {
        console.log(err);
        this.firstName = '';
      }
      
    }
  },
  async mounted() {
    AmplifyEventBus.$on('authState', info => {
      switch(info) {
                case 'signedOut' :
                    this.$store.dispatch('auth/setLoggedIn', false)
                   this.$router.push('/login');
                   break;
                default:
                    break;
            }
    })
  }
}
</script>

