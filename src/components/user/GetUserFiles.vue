<template>
    <b-container class="d-flex h-100 align-items-center justify-content-center">

     <!-- <amplify-s3-image imagePath="path"></amplify-s3-image> -->
      <b-table hover bordered :items='files' :fields="fields" sort-icon-left
      responsive="sm" head-variant="light">
        <template v-slot:cell(index)="data">
        {{ data.index + 1 }}
        </template>
        <template v-slot:cell(Actions)="row">
          <!-- <b-btn pill variant="primary" size="sm" @click="getFile(row.item)" v-b-modal.data-modal>Get File</b-btn> -->
          <!-- <b-dropdown id="dropdown-dropright" size="sm" dropright text=". . ." variant="outline-secondary" class="m-2"> -->
          <b-dropdown id="dropdown-dropright" size="sm" dropright text=". . ." variant="primary" class="m-2"  button-content > 
             <template v-slot:button-content>
                 <fa icon="ellipsis-v" />
             </template>
             <b-dropdown-item @click="getFile(row.item)" v-b-modal.data-modal>Download File</b-dropdown-item>
             <b-dropdown-item @click="getFile(row.item)" v-b-modal.delete-modal>Delete File</b-dropdown-item>
             <b-dropdown-item @click="getFile(row.item)" v-b-modal.update-modal>Update/Replace</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <b-modal id="data-modal" centered title="File Details" hide-footer header-bg-variant="primary">
        <div>
          <p><b>Owner:</b> {{modalData.firstName}} {{modalData.lastName}}</p>
          <p><b>Created At:</b> {{new Date(modalData.createdAt).toUTCString()}}</p>
          <p><b>Updated At:</b> {{new Date(modalData.updatedAt).toUTCString()}}</p>
          <p><b>File Description:</b> {{modalData.fileDescription}}</p>
          <b-btn block @click="downloadFile(modalData)" variant="outline-dark"><fa icon="download" /> Download</b-btn>
        </div>
      </b-modal>
      <b-modal id="delete-modal" ref="modal" centered title="File Details" hide-footer header-bg-variant="primary">
        <div>
          <p><b>Owner:</b> {{modalData.firstName}} {{modalData.lastName}}</p>
          <p><b>Created At:</b> {{new Date(modalData.createdAt).toUTCString()}}</p>
          <p><b>Updated At:</b> {{new Date(modalData.updatedAt).toUTCString()}}</p>
          <p><b>File Description:</b> {{modalData.fileDescription}}</p>
          <b-btn block @click="deleteFile(modalData)" variant="outline-dark"><fa icon="trash" /> Delete</b-btn>           
        </div>
      </b-modal>
      <b-modal id="update-modal" ref="modal"  centered title="File Details" hide-footer header-bg-variant="primary">
        <div>
          <p><b>Owner:</b> {{modalData.firstName}} {{modalData.lastName}}</p>
          <p><b>Created At:</b> {{new Date(modalData.createdAt).toUTCString()}}</p>
          <p><b>Updated At:</b> {{new Date(modalData.updatedAt).toUTCString()}}</p>
          <p><b>File Description:</b> {{modalData.fileDescription}}</p>
          <b-btn block @click="updateFile(modalData)" variant="outline-dark"><fa icon="upload" /> Update</b-btn>
        </div>
      </b-modal>
    </b-container>

</template>


<script>

export default {
  data: () => ({
    // myGetFile: [],  
    files: [],
    fields: [
      {key: 'index', label: 'SN'},
      {key: 'key', label: 'File', sortable: true},
      {key: 'lastModified', label: 'Last Modified', sortable: true},
      'Actions'
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
        //console.log("cognito ", cognitoId.idToken.payload['cognito:username']);
        const response = await this.$Amplify.Storage.list(cognitoId.idToken.payload['cognito:username']);
        console.log(response);
        this.files = response.map(val => {
          val.key = val.key.split('/')[1];
          return val;
        });
        // console.log(this.files);
      } catch(err) {
        console.log(err.response);
      }
    },
    /***Get files from User Dynamo***/
    async getFile(row) {
      try {
        // console.log(row);
        let apiName = 's3api';
        const cognitoId = await this.$Amplify.Auth.currentSession();
        let fileKey = `${cognitoId.idToken.payload['cognito:username']},${row.key}`;
        let dyFileKey = '/files/'+ fileKey;   //path to Dynamo 
        // console.log(dyFileKey);
        const response = await this.$Amplify.API.get(apiName, dyFileKey);
        this.modalData = response[0];
        console.log(response);
      } catch(err) {
        console.log(err);
      }
    },
     /***Get and Download a File Frpom S3***/
    async downloadFile(modalData) {
        try{
          const s3Key = modalData.fileKey;
          const s3file =  modalData.fileDescription
        //   console.log(s3Key);        //path to S3 file
        //   console.log(s3file);
          const response = await this.$Amplify.Storage.get(s3Key, s3file, {
            download: true
          });
          console.log(response);
          window.location.href = response; //execute download
        } catch (err) {
          console.log(err);
        }
    },
    /***Delete a File From Dynamo and S3***/
    async deleteFile(modalData){
      try{
        /*Delete Dynamo file information*/
        //   console.log(modalData);
          let apiName = 's3api';
        //   console.log(apiName);
          let dyFileKey = '/files/object/'+ modalData.fileKey.replace('/',',');
        //   console.log(dyFileKey);
          const responseDy = await this.$Amplify.API.del(apiName, dyFileKey);
          console.log(responseDy);
        /*Delete S3 file file*/
          const s3Key = modalData.fileKey;
        //   console.log(s3Key);
          const responseS3 = await this.$Amplify.Storage.remove(s3Key);
          console.log(responseS3);
        this.$refs.modal.hide();
      }catch(err){
         console.log(err); 
      }
    },
    /***Update & Replace a File From S3***/
    // async updateFile(modalData){
    //   try{
    //     console.log(modalData);
    //     this.$refs.modal.hide();

    //   } catch(err){
    //     console.log(err);
    //   } 
    // }, 
    async onSubmit(modalData) {
          const s3key =  modalData.fileKey;   //xyxyxyxyxyyxyx/myFiles1.txt
          const fileName = modalData.fileDescription;
        //   console.log(s3key)   
        //   console.log(fileName); 
        //   console.log(modalData);
          try{
            if( fileName ===  this.userFile.name ){
               const response = await this.$Amplify.Storage.put(s3key, fileName, {});
               let apiName = 's3api';
               let path = '/files';
 
               const postResponse = (response.key === s3key) ?
                 await this.$Amplify.API.put(apiName, path, ({
                    body: {    //Just update the new date
                        fileKey: response.key,
                        cognitoId: modalData.cognitoId,
                        firstName: modalData.firstName,
                        lastName: modalData.lastName,
                        createdAt:modalData.createdAt,
                        updatedAt: new Date(),
                        fileDescription: fileName
                    }
                 })) : false;
              console.log(postResponse);
              this.$refs.modal.hide();
            }else{
               console.log("You need to choose the same file Name");
            }
          }catch(err){
            console.log(err);
          }
    }  

  }
}

</script>