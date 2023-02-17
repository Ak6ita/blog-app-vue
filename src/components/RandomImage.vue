<template>
  <div>
    <img :src="selectedImage" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://picsum.photos/200/",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
        "https://picsum.photos/203",
      ],
      selectedImage: "",
    };
  },
  created() {
    let randomIndex = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[randomIndex];
  },
};
</script>