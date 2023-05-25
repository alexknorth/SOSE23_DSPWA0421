<template>
    <div class="address-item"> 
        {{ address.street + " " +address.number }}
    </div>
</template>

<script>
export default {
  props: {
    address: {}
  }
}
</script>

<style scoped>
.address-item {
    color:green;
    text-align: left;
   


}


</style>
