<template>
    <Header></Header>
    <profile-section :category="category"></profile-section>
    <organization v-if="category" :category="category"></organization>
    <Footer></Footer>
</template>

<script>
import Header from '../../../components/header/Header';
import Footer from "../../../components/footer/Footer";
import ProfileSection from '../../../components/sections/ProfileSection';
import Organization from '../../../components/layout/Organization';
export default {
    name: "Category",
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
            this.$axios.get('/api/category/slug/'+this.$route.params.category)
                .then(response => {
                    this.category   =   response.data.data;
                });
        },
    }
}
</script>

<style lang="scss">

</style>
