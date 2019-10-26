<template>
    <b-container class="d-flex h-100 align-items-center justify-content-center">

     <!-- <amplify-s3-image imagePath="path"></amplify-s3-image> -->
      <b-table hover bordered :items='files' :fields="fields" sort-icon-left
      responsive="sm" head-variant="light">
        <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
        </template>
        <template v-slot:cell(Details)="row">
          <b-btn variant="primary" size="sm" @click="getFile(row.item)" v-b-modal.data-modal>See File Details</b-btn>
        </template>
      </b-table>
      <b-modal id="data-modal" centered title="File Details" hide-footer header-bg-variant="primary">
        <div>
          <p><b>Owner:</b> {{modalData.firstName}} {{modalData.lastName}}</p>
          <p><b>Created At:</b> {{new Date(modalData.createdAt).toUTCString()}}</p>
          <p><b>Updated At:</b> {{new Date(modalData.updatedAt).toUTCString()}}</p>
          <p><b>File Description:</b> {{modalData.fileDescription}}</p>
          <b-btn block @click="downloadFile(modalData.fileDescription)" variant="outline-dark"><fa icon="download" /> Download</b-btn>
        </div>
      </b-modal>
    </b-container>


</template>


<script>

export default {
  data: () => ({
    files: [],
    fields: [
      {key: 'index', label: 'SN'},
      {key: 'key', label: 'File', sortable: true},
      {key: 'lastModified', label: 'Last Modified', sortable: true},
      'Details'
    ],
    modalData: {}
  }),
  mounted() {
    this.getFiles();
  },
  methods: {
    async getFiles() {
      try{
        const cognitoId = await this.$Amplify.Auth.currentSession();
        const response = await this.$Amplify.Storage.list(cognitoId.idToken.payload['cognito:username']);
        this.files = response.map(val => {
          val.key = val.key.split('/')[1];
          return val;
        });
        console.log(this.files);
      } catch(err) {
        console.log(err.response);
      }
    },
    async getFile(row) {
      try {
        console.log(row);
        let apiName = 's3api';
        const cognitoId = await this.$Amplify.Auth.currentSession();
        let fileKey = `${cognitoId.idToken.payload['cognito:username']},${row.key}`;
        let path = '/files/'+ fileKey;
        console.log(path);
        const response = await this.$Amplify.API.get(apiName, path);
        this.modalData = response[0];
        console.log(response);
      } catch(err) {
        console.log(err);
      }
    },
    async downloadFile(fileDescription) {
        try{
          const cognitoUser = await this.$Amplify.Auth.currentSession();    //UserID in Cognito
          const s3Path = `${cognitoUser.idToken.payload['cognito:username']}/${fileDescription}`;    //file name and  Path in S3
          console.log(cognitoUser);
          console.log(s3Path);

          const response = await this.$Amplify.Storage.get(s3Path, fileDescription, {
            download: true
          });
          console.log(response);
          window.location.href = response;
        } catch (err) {
          console.log(err);
        }
    }
  }
}

</script>