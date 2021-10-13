<template>
    <div>
      <Header></Header>
      <profile-section :category="category"></profile-section>
      <organization v-if="category" :category="category"></organization>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from '../../../components/header/Header';
import Footer from "../../../components/footer/Footer";
import ProfileSection from '../../../components/sections/ProfileSection';
import Organization from '../../../components/layout/Organization';
export default {
    name: "Index",
    components: {
        Header,
        Footer,
        ProfileSection,
        Organization,
    },
    async fetch({store, route}) {
      await store.dispatch('category/getCategoryBySlug',{
        slug: route.params.category
      });
    },
    computed: {
      category() {
        return this.$store.state.category.category;
      }
    },
}
</script>

<style lang="scss">

</style>
