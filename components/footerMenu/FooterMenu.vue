<template>
    <div class="container d-md-none">
        <div class="row bg-white width-auto footer-fixed d-flex justify-content-center">
            <div class="col-12 col-md-4 p-0">
                <div class="footer-fixed-main w-100 d-flex">
                    <router-link :to="'/home'" class="footer-icon p-0 py-1">
                        <button class="btn font-weight-bold w-100" :class="{'footer-icon-center':(this.url==='home')}">
                            <img src="/img/logo/home.svg" class="footer-img" alt="home">
                            <div class="title">Категории</div>
                        </button>
                    </router-link>
                    <router-link :to="'/news'" class="footer-icon p-0 py-1">
                        <button class="btn font-weight-bold w-100" :class="{'footer-icon-center':(this.url==='news')}">
                            <img src="/img/logo/newspaper.svg" class="footer-img">
                            <div class="title">Новости</div>
                        </button>
                    </router-link>
                    <a class="footer-icon p-0 py-1" v-if="$store.state.localStorage.token"  @click="view(1)">
                        <button class="btn font-weight-bold w-100" :class="{'footer-icon-center-notify': ($store.state.localStorage.sidebar.notifications > 0)}" @mouseup="show = !show" @mousedown.stop>
                            <img src="/img/logo/notification.svg" class="footer-img" v-if="data.length > 0">
                            <img src="/img/logo/bell.svg" class="footer-img" v-else>
                            <div class="title">Уведомления</div>
                            <div class="footer-menu-notifications" :class="{'footer-menu-notifications-show':show}" @mouseup.stop>
                                <div class="footer-menu-notifications-list" v-if="data.length > 0">
                                    <perfect-scrollbar>
                                        <div class="footer-menu-notifications-item" v-for="(item,key) in data" :key="key"  @click="comment(key)" data-toggle="modal" data-target="#comment_modal">
                                            <div class="footer-menu-notifications-item-icon" :style="{'background-image':'url('+item.organization.image+')'}"></div>
                                            <div class="footer-menu-notifications-item-detail">
                                                <div class="footer-menu-notifications-item-detail-title">{{item.organization.title}} • <span v-if="item.organization_tables">{{item.organization_tables.title}}</span></div>
                                                <div class="footer-menu-notifications-item-detail-description">{{item.date}} • {{item.time}}</div>
                                            </div>
                                            <div class="footer-menu-notifications-item-arr"></div>
                                        </div>
                                    </perfect-scrollbar>
                                </div>
                                <div class="footer-menu-main" v-else>
                                    <div class="footer-menu-icon"></div>
                                    <div class="footer-menu-title">Уведомлении нет</div>
                                </div>
                            </div>
                        </button>
                    </a>
                    <a class="footer-icon p-0 py-1" data-toggle="modal" data-target="#auth_modal" v-else>
                        <button class="btn font-weight-bold w-100">
                            <img src="/img/logo/bell.svg" class="footer-img">
                            <div class="title">Уведомления</div>
                        </button>
                    </a>
                    <router-link :to="'/favorite'" class="footer-icon p-0 py-1">
                        <button class="btn font-weight-bold w-100" :class="{'footer-icon-center':(this.url==='favorite')}">
                            <img src="/img/logo/favorite.svg" class="footer-img">
                            <div class="title">Избранное</div>
                        </button>
                    </router-link>
                    <router-link :to="'/profile'" class="footer-icon p-0 py-1" v-if="$store.state.localStorage.token">
                        <button class="btn font-weight-bold w-100" :class="{'footer-icon-center':(this.url==='profile')}">
                            <img src="/img/logo/profile.svg" class="footer-img">
                            <div class="title">Профиль</div>
                        </button>
                    </router-link>
                    <a class="footer-icon p-0 py-1" data-toggle="modal" data-target="#auth_modal" v-else>
                        <button class="btn font-weight-bold w-100">
                            <img src="/img/logo/profile.svg" class="footer-img">
                            <div class="title">Профиль</div>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FooterMenu",
    props: ['data'],
    data() {
        return {
            show: false,
            end: '',
            url: ''
        }
    },
    created() {
        this.setEnd();
        if (process.browser) {
            window.addEventListener('mousedown',this.hide);
        }
    },
    destroyed: function() {
        if (process.browser) {
            window.removeEventListener('mousemove', this.hide);
        }
    },
    methods: {
        hide: function() {
            this.show   =   false;
        },
        comment: function(key) {
            this.$emit('setComment',key);
        },
        view: function(index) {
            this.$store.state.localStorage.sidebar.view   =   index;
            this.$store.state.localStorage.sidebar.show   =   true;
        },
        setEnd: function() {
            if (process.browser) {
              let path    =   window.location.pathname.split('/');
              this.url    =   path[ path.length - 1 ];
              let length  =   path.length;
              for (let i = 0; i < length; i++) {
                if (path[i].trim() !== '') {
                  this.end    =   path[i];
                  break;
                }
              }
            }
        },
    }
}
</script>

<style lang="scss">
    @import '../../assets/footerMenu/footerMenu.scss';
</style>
