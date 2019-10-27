<template>
  <b-container fluid class="mt-4 pl-4 pr-4">
     <b-card class="mt-0 pl-4 pr-4" body-class="text-center" header-tag="nav">
         <b-form @submit.stop.prevent="onSubmit">
            <b-form-group label="Default:" label-for="file-default" label-cols-sm="2">
                 <b-form-file v-model="userFile" id="file-default"></b-form-file>
             </b-form-group>
             <b-btn block type="submit">Upload</b-btn>
         </b-form>
       </b-card>
    </b-container>
</template>


<script>
export default {
   data: () => ({
       files: [],
       userFile: null
   }),
   async mounted() {
    console.log(await this.$Amplify.Auth.currentSession());
   },
   methods: {
      async onSubmit() {
          const cognitoUser = await this.$Amplify.Auth.currentSession();
          const s3Path = `${cognitoUser.idToken.payload['cognito:username']}/${this.userFile.name}`;
          console.log(s3Path)
          console.log(this.userFile);
          try {
              const response = await this.$Amplify.Storage.put(s3Path, this.userFile, {});
              let apiName = 's3api';
              let path = '/files';
              const postResponse = (response.key === s3Path) ?
                await this.$Amplify.API.post(apiName, path, ({
                    body: {
                        fileKey: response.key,
                        cognitoId: cognitoUser.idToken.payload['cognito:username'],
                        firstName: cognitoUser.idToken.payload['custom:firstName'],
                        lastName: cognitoUser.idToken.payload['custom:lastName'],
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        fileDescription: this.userFile.name
                    }
                })) : false;
             console.log(postResponse);
         } catch(err) {
            console.log(err)
         }
      } 
   }
}
</script>