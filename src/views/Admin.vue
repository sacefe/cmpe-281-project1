<template>
  <b-container fluid class="mt-4 pl-4 pr-4">
     <b-card class="mt-0 pl-4 pr-4" body-class="text-center" header-tag="nav">
        <template v-slot:header>
         <b-nav card-header tabs>
            <b-nav-item to="/admin">Get Files</b-nav-item>
            <b-nav-item to="/admin/update">Update</b-nav-item>
            <b-nav-item to="/admin/upload">Upload</b-nav-item>
            <b-nav-item class="ml-auto">Delete</b-nav-item>
          </b-nav>

        </template>

         <router-view />
    </b-card> 
</b-container>

</template>

<script>

</script>