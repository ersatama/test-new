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
    data() {
        return {
            category: false,
        }
    },
    created() {
        this.getCategoryBySlug();
    },
    methods: {
        getCategoryBySlug: function() {
            this.$repository.category.getCategoryBySlug(this.$route.params.category).then(response => {
                this.category = response;
            });
        },
    }
}
</script>

<style lang="scss">

</style>
