<template>
    <div>
      <Header></Header>
      <profile-section :name="organization.title || ''" :id="$route.params.id" :category="category"></profile-section>
      <loading v-if="loading"></loading>
      <template v-else-if="organization">
        <div class="container-fluid bg-white">
          <div class="row">
            <div class="wallpaper" :style="{'background-image':'url('+organization.wallpaper+')'}">
              <div class="wallpaper-screen">
                <div class="organization-description text-center text-white">{{organization.address}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid bg-white">
          <div class="container p-0">
            <div class="row">
              <div class="col-12 p-0">
                <div class="organization-main">
                  <div class="d-flex organization-photo">
                    <div class="organization-logo">
                      <img v-if="organization.image" :src="organization.image">
                    </div>
                  </div>
                  <div class="organization-title text-dark font-weight-bold text-center">
                    <div>{{organization.title}}</div>
                    <div class="favorite-main" :class="{'favorite-main-off':(!$store.state.localStorage.favorite.includes(organization.id)),'favorite-main-on':($store.state.localStorage.favorite.includes(organization.id))}" @click="favorite(organization.id)"></div>
                  </div>
                  <div class="organization-rating">
                    <div>
                      <div class="organization-rating-star" :class="{'organization-rating-star-sel':(organization.rating >= 0.5)}"></div>
                      <div class="organization-rating-star" :class="{'organization-rating-star-sel':(organization.rating >= 1.5)}"></div>
                      <div class="organization-rating-star" :class="{'organization-rating-star-sel':(organization.rating >= 2.5)}"></div>
                      <div class="organization-rating-star" :class="{'organization-rating-star-sel':(organization.rating >= 3.5)}"></div>
                      <div class="organization-rating-star" :class="{'organization-rating-star-sel':(organization.rating >= 4.5)}"></div>
                      <div class="organization-rating-count" v-if="organization.rating">{{organization.rating}}</div>
                    </div>
                  </div>
                  <div class="wallpaper-icons">
                    <a :href="organization.vk" v-show="organization.vk" target="_blank" class="wallpaper-icon wallpaper-icon-vk"></a>
                    <a :href="organization.youtube" v-show="organization.youtube" target="_blank" class="wallpaper-icon wallpaper-icon-youtube"></a>
                    <a :href="organization.facebook" v-show="organization.facebook" target="_blank" class="wallpaper-icon wallpaper-icon-facebook"></a>
                    <a :href="organization.instagram" v-show="organization.instagram" target="_blank" class="wallpaper-icon wallpaper-icon-instagram"></a>
                  </div>
                  <template v-if="user">
                    <div class="organization-subscribed" v-if="subscribe && subscribe.status === 'on'" @click="subscribeNow()">Вы подписаны</div>
                    <div class="organization-subscribe" v-else @click="subscribeNow()">Подписаться</div>
                  </template>
                  <div v-else class="organization-subscribe" data-toggle="modal" data-target="#auth_modal">Подписаться</div>
                </div>
                <div class="organization-description text-secondary text-center">{{organization.description}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid bg-white organization-shadow-main px-0">
          <div class="container py-0">
            <div class="row pt-2">
              <div class="col d-flex justify-content-center">
                <div class="card text-center bg-transparent border-0">
                  <div class="card-header bg-transparent d-flex justify-content-center border-0">
                    <ul class="nav nav-tabs card-header-tabs margin-0 border-0">
                      <li class="nav-item">
                        <a class="nav-link h6 text-secondary bg-transparent organization-tab py-3 px-0 d-block" :class="{active: (tab === 1), 'organization-tab-sel': (tab === 1)}" role="button" @click="tab = 1">Бронирование</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link h6 text-secondary bg-transparent organization-tab py-3 px-0 d-block" :class="{active: (tab === 2), 'organization-tab-sel': (tab === 2)}" role="button" @click="tab = 2">Галлерея</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link h6 text-secondary bg-transparent organization-tab py-3 px-0 d-block" :class="{active: (tab === 3), 'organization-tab-sel': (tab === 3)}" role="button" @click="tab = 3">Отзывы</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link h6 text-secondary bg-transparent organization-tab py-3 px-0 d-block" :class="{active: (tab === 4), 'organization-tab-sel': (tab === 4)}" role="button" @click="tab = 4">Меню</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sections v-if="tab === 1" :id="organization.id" :organization="organization"></Sections>
        <Photos v-if="tab === 2" :api="'/api/image/organization/'+organization.id"></Photos>
        <Reviews v-if="tab === 3" :id="organization.id"></Reviews>
        <Photos v-if="tab === 4" :api="'/api/menu/list/'+organization.id"></Photos>
      </template>
      <not-found v-else :params="notFound"></not-found>
      <Footer></Footer>
    </div>
</template>

<script>
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import ProfileSection from '../../../../components/sections/ProfileSection';
import NotFound from '../../../../components/layout/Not-found'
import Loading from '../../../../components/layout/Loading';
import Reviews from '../../../../components/layout/Reviews';
import Photos from '../../../../components/layout/Photos';
import Sections from '../../../../components/layout/Sections';
export default {
    components: {
        Header,
        Footer,
        ProfileSection,
        NotFound,
        Loading,
        Reviews,
        Photos,
        Sections
    },
    name: "index",
    data() {
        return {
            category: false,
            notFound: {
                img: '/img/logo/table.svg',
                title: 'Заведение не найдено',
                description: 'Возможно в данный момент заведение закрыт'
            },
            loading: true,
            status: 0,
            tab: 1,
            organization: false,
            subscribe: false,
            user: false
        }
    },
    created() {
        this.setUser();
        this.getCategoryBySlug();
    },
    methods: {
        subscribeNow: function() {
            if (!this.subscribe) {
                this.$repository.organization.create(this.organization.id,this.user.id).then(response => {
                    this.subscribe  =   response.data.data;
                });
            } else if (this.subscribe.status === 'on') {
                this.subscribe.status   =   'off';
                this.$repository.organization.update(this.subscribe.id,this.organization.id,this.user.id,'off');
            } else {
                this.subscribe.status   =   'on';
                this.$repository.organization.update(this.subscribe.id,this.organization.id,this.user.id,'on');
            }
        },
        setUser: async function () {
            if (this.$store.state.localStorage.token) {
                let user    =   this.$store.state.sessionStorage.user;
                if (user) {
                    this.status = true;
                    this.user = user;
                } else {
                    await this.$axios.get(this.url+'/api/token/' + this.$store.state.localStorage.token,{
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    })
                        .then(response => {
                            let data = response.data;
                            if (data.hasOwnProperty('data')) {
                                this.$store.commit('sessionStorage/setUser',data.data);
                                this.status = true;
                                this.user = data.data;
                            }
                        }).catch(error => {
                            this.status = false;
                        });
                }
            }
        },
        getCategoryBySlug: function() {
            this.$axios.get('/api/category/slug/'+this.$route.params.category,{
                headers: {
                  'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.category   =   response.data.data;
                    this.getOrganization();
                });
        },
        favorite: function(id) {
            let status  =   true;
            for (let i = 0; i < this.$store.state.localStorage.favorite.length; i++) {
                if (this.$store.state.localStorage.favorite[i] === id) {
                    this.$store.commit('localStorage/spliceFavorite',i);
                    status  =   false;
                }
            }
            if (status) {
                this.$store.commit('localStorage/addFavorite',id);
            }
        },
        getOrganization: function() {
            this.$axios.get('/api/organization/'+this.$route.params.id,{
                headers: {
                  'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.organization   =   response.data.data;
                    this.loading    =   false;
                    this.getSubscribe();
                }).catch(error => {
                    this.loading    =   false;
                });
        },
        getSubscribe: function() {
            if (this.user) {
                this.$axios.get('/api/newsSubscribe/getByOrganizationIdAndUserId/'+this.organization.id+'/'+this.user.id,{
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        this.subscribe  =   response.data.data;
                    }).catch(error => {
                        this.subscribe  =   false;
                    });
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../../../assets/favorite/favorite.scss';
@import '../../../../assets/organization/organization.scss';
</style>
