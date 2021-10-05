<template>
  <div>
    <Header></Header>
    <profile-section></profile-section>
    <Search @filterUpdate="filterUpdate"></Search>
    <loading v-if="!menu"></loading>
    <div class="container-fluid p-0 m-0 home-bg-color" v-else-if="result && menu.length">
      <div class="container p-0">
        <div class="row home-main">
          <div class="col-12 col-md-6 d-flex justify-content-center p-0" v-for="(item,key) in menu" :key="key">
            <router-link :to="'/home/'+item.slug" class="d-block w-100 text-decoration-none p-0 px-2 p-md-2">
              <div class="home-category">
                <div class="home-category-shadow">
                  <div class="home-category-shadow-layer">
                    <div class="home-category-icon">
                      <div :style="{'background-image': 'url('+item.image+')'}"></div>
                    </div>
                    <div>
                      <div class="home-category-title">
                        {{item.title}}
                      </div>
                      <div class="home-category-description">
                        {{item.description}}
                      </div>
                    </div>
                    <div class="home-category-arrow">
                      <div></div>
                    </div>
                  </div>
                  <div class="home-category-shadow-img home-bg" :style="{'background-image':'url('+item.wallpaper+')'}"></div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid py-3 py-md-4 item-bg" v-else-if="!result && organizations.length > 0">
      <div class="container p-0">
        <div class="row">
          <div class="result">
            <div class="result-body">
              <div class="result-body-header">
                <div class="result-body-header-return" @click="result = true">Категорий</div>
                <div class="result-body-header-count" v-if="found >= 0">Найдено заведении <span>{{found}}</span></div>
                <div class="result-body-header-sort">
                  <div class="result-body-header-sort-title">Сортировка:</div>
                  <div class="result-body-header-sort-dropdown">
                    <div class="result-body-header-sort-dropdown-title" @click="selected.show = !selected.show">{{ sort[selected.index].title }}</div>
                    <div class="result-body-header-sort-dropdown-list" :class="{'result-body-header-sort-dropdown-list-open':selected.show}">
                      <div class="result-body-header-sort-dropdown-list-item" v-for="(item,key) in sort" :key="key" @click=" selectedValue(key); ; selected.show = false">{{item.title}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="result-body-main">
                <Card :organization="organization" v-for="(organization,key) in organizations" :key="key"></Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <not-found v-else :params="notFound"></not-found>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../components/header/Header";
import ProfileSection from '../../components/sections/ProfileSection';
import Search from '../../components/layout/Search';
import Loading from '../../components/layout/Loading';
import Card from '../../components/layout/Card';
import NotFound from '../../components/layout/Not-found';
import Footer from "../../components/footer/Footer";
export default {
  components: {
    Header,
    ProfileSection,
    Search,
    Loading,
    Card,
    NotFound,
    Footer,
  },
  name: "Home",
  data() {
    return {
      notFound: {
        img: '/img/logo/menu.svg',
        title: 'Список пуст',
        description: 'Не найдено.'
      },
      sort: [{title:'По рейтингу'},{title:'Сначала дорогие'},{title:'Сначала дешевые'}],
      filters: {
        price: {
          status: false,
          min: 0,
          max: 0,
        },
        ratings: {
          status: false,
          min: 0,
          max: 0,
        },
        tags: [],
      },
      result: true,
      selected: {
        index: 0,
        show: false,
      },
    }
  },
  async fetch({store}) {
    await store.dispatch('organization/menu');
  },
  computed: {
    menu() {
      return this.$store.state.organization.menu;
    },
    found() {
      return this.$store.state.organization.found;
    },
    organizations() {
      return this.$store.state.organization.organizations;
    },
    city() {
      return this.$store.state.localStorage.city.id;
    }
  },
  mounted() {
    if (process.browser) {
      this.scrollEvent();
    }
  },
  methods: {
    selectedValue: function(key) {
      this.$store.commit('organization/init');
      this.selected.index = key;
      this.getCountOrganizationsByCategoryId();
      this.getOrganizationsByCategoryId();
    },
    filterUpdate: function(data) {
      this.result =   false;
      this.$store.commit('organization/init');
      this.filters =   data;
      this.getCountOrganizationsByCategoryId();
      this.getOrganizationsByCategoryId();
    },
    scrollEvent: function() {
      let self    =   this;
      window.document.body.onscroll = function() {
        let height = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight;
        if ((document.documentElement.offsetHeight - height) < 1000) {
          self.getOrganizationsByCategoryId();
        }
      }
    },
    getCountOrganizationsByCategoryId: function() {
      this.$store.dispatch('organization/getCountOrganizationsByCategoryId',{
        city: this.city,
        page: this.$store.state.organization.page,
        filters: this.filters
      })
    },
    getOrganizationsByCategoryId: function() {
      if (!this.result && this.$store.state.organization.status) {
        this.$store.commit('organization/setStatus',false);
        this.filters.sort    =   this.selected.index;
        this.$store.dispatch('organization/getOrganizationsByCategoryId', {
          city: this.city,
          page: this.$store.state.organization.page,
          filters: this.filters
        });
      }
    },
  }
}
</script>

<style lang="scss">
@import "assets/home/home.scss";
@import 'assets/layout/organization.scss';
</style>
